import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { HiInformationCircle } from "react-icons/hi";
import request from "../../../services/ApiClient";
import { decodeUser } from "../../../services/decode-user";
import { ToastComponent } from "../../../components/Toast";

const currentUser = decodeUser();

export const ApproveModal = ({
  isOpen,
  onClose,
  orderNo,
  setOrderNo,
  fetchOrderList,
  fetchOrdersByOrderNo,
}) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = () => {
    setIsLoading(true);
    try {
      const res = request
        .put(`Ordering/ApprovePreparedDate`, {
          orderNoPKey: orderNo,
        })
        .then((res) => {
          ToastComponent(
            "Success",
            "Order has been approved.",
            "success",
            toast
          );
          setOrderNo("");
          // fetchNotification()
          fetchOrderList();
          fetchOrdersByOrderNo();
          setIsLoading(false);
          onClose();
        })
        .catch((err) => {
          ToastComponent(
            "Success",
            "Order was not approved.",
            "success",
            toast
          );
          setIsLoading(false);
        });
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="sm">
      <ModalOverlay />
      <ModalContent bg="primary" color="white">
        <ModalHeader>
          <Flex justifyContent="center">
            <HiInformationCircle fontSize="40px" />
          </Flex>
          <Text textAlign="center" fontSize="15px">
            Confirmation!
          </Text>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <ModalBody>
          <Text textAlign="center" fontSize="12px">
            Are you sure you want to approve this order?
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <ButtonGroup size="sm" mt={7}>
            <Button
              colorScheme="blue"
              onClick={submitHandler}
              isLoading={isLoading}
              disabled={isLoading}
              borderRadius="none"
              fontSize="10px"
            >
              Yes
            </Button>
            <Button
              colorScheme="red"
              onClick={onClose}
              isLoading={isLoading}
              disabled={isLoading}
              borderRadius="none"
              fontSize="10px"
            >
              No
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const RejectModal = ({
  isOpen,
  onClose,
  orderNo,
  setOrderNo,
  fetchOrderList,
  fetchOrdersByOrderNo,
  fetchNotification,
}) => {
  const [reason, setReason] = useState("");
  const [reasonData, setReasonData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const fetchReasonApi = async () => {
    const res = await request.get(`Reason/GetAllActiveReasons`);
    return res.data;
  };

  const fetchReason = () => {
    fetchReasonApi().then((res) => {
      setReasonData(res);
    });
  };

  useEffect(() => {
    fetchReason();

    return () => {
      setReasonData([]);
    };
  }, []);

  const submitHandler = () => {
    setIsLoading(true);
    try {
      const res = request
        .put(`Ordering/RejectPreparedDate`, {
          orderNoPKey: orderNo,
          remarks: reason,
          rejectedBy: currentUser.userName,
        })
        .then((res) => {
          ToastComponent("Succes", "Order has been rejected", "success", toast);
          setOrderNo("");
          // fetchNotification()
          fetchOrderList();
          fetchOrdersByOrderNo();
          setIsLoading(false);
          onClose();
        })
        .catch((err) => {
          ToastComponent("Error", "Reject failed", "error", toast);
          setIsLoading(false);
        });
    } catch (error) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="sm">
      <ModalOverlay />
      <ModalContent bg="primary" color="white">
        <ModalHeader>
          <Flex justifyContent="center">
            <HiInformationCircle fontSize="40px" />
          </Flex>
          <Text textAlign="center" fontSize="12px">
            Confirmation!
          </Text>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />

        <ModalBody>
          <VStack justifyContent="center">
            <Text textAlign="center" fontSize="11px">
              Are you sure you want to reject this order?
            </Text>
            {reasonData.length > 0 ? (
              <Select
                size="sm"
                color="black"
                fontSize="12px"
                onChange={(e) => setReason(e.target.value)}
                placeholder="Please select a reason"
                bgColor="#fff8dc"
                w="60%"
              >
                {reasonData?.map((reason, i) => (
                  <option key={i} value={reason.reasonName}>
                    {reason.reasonName}
                  </option>
                ))}
              </Select>
            ) : (
              "loading"
            )}
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <ButtonGroup size="sm" mt={7}>
            <Button
              colorScheme="blue"
              disabled={!reason || isLoading}
              onClick={submitHandler}
              isLoading={isLoading}
              fontSize="10px"
              borderRadius="none"
            >
              Yes
            </Button>
            <Button
              colorScheme="red"
              isLoading={isLoading}
              disabled={isLoading}
              fontSize="10px"
              borderRadius="none"
            >
              No
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
