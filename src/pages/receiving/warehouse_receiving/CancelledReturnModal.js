import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Text,
  useToast,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import request from "../../../services/ApiClient";
import { ToastComponent } from "../../../components/Toast";
import { decodeUser } from "../../../services/decode-user";

const currentUser = decodeUser();

const CancelledReturnModal = ({
  poId,
  getCancelledPOHandler,
  isOpen,
  onClose,
  editData,
}) => {
  const [reasons, setReasons] = useState([]);
  const [submitReason, setSubmitReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const toast = useToast();

  const fetchReasonsApi = async () => {
    const res = await request.get("Reason/GetAllActiveReasons");
    return res.data;
  };

  const getReasonHandler = async () => {
    fetchReasonsApi().then((res) => {
      setReasons(res);
    });
  };

  useEffect(() => {
    getReasonHandler();
  }, [setReasons]);

  const reasonHandler = (data) => {
    if (data) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
    const newData = JSON.parse(data);
    setSubmitReason(newData.reasonName);
  };

  const submitHandler = () => {
    try {
      setIsLoading(true);
      const res = request
        .put(`Warehouse/ReturnPoInAvailableList`, {
          id: editData,
          reason: submitReason,
        })
        .then((res) => {
          ToastComponent("Success", "PO Returned", "success", toast);
          getCancelledPOHandler();
          //   fetchNotification();
          onClose();
        })
        .catch((err) => {
          setIsLoading(false);
          ToastComponent("Error", "Cancel Failed", "error", toast);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="md">
      <ModalOverlay />
      <ModalContent color="white" justifyContent="center">
        <ModalHeader fontSize="17px" bg="primary">
          <Flex justifyContent="center">
            <Text>Cancel PO</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody>
          <VStack justifyContent="center">
            <Text color="#000">
              Are you sure you want to return this raw material?
            </Text>
            {reasons.length > 0 ? (
              <Select
                onChange={(e) => reasonHandler(e.target.value)}
                placeholder="Select a reason"
                w="60%"
                color="#000"
                bgColor="#fff8dc"
              >
                {reasons?.map((reason) => (
                  <option key={reason.id} value={JSON.stringify(reason)}>
                    {reason.reasonName}
                  </option>
                ))}
              </Select>
            ) : (
              "Loading"
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup size="sm">
            <Button
              onClick={() => submitHandler()}
              isLoading={isLoading}
              disabled={isDisabled}
              colorScheme="blue"
              _hover={{ bgColor: "accent", color: "white" }}
            >
              Yes
            </Button>
            <Button
              onClick={onClose}
              // disabled={!Boolean(submitReason)}
              color="gray.500"
              _hover={{ bgColor: "gray", color: "white" }}
            >
              No
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelledReturnModal;