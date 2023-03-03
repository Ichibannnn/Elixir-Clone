import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import request from '../../../services/ApiClient'
import moment from "moment";
import { ToastComponent } from "../../../components/Toast";
import PageScrollEditReceiving from "../../../components/PageScrollEditReceiving";
import { decodeUser } from "../../../services/decode-user";
import EditAddRejectionModal from "./EditAddRejectionModal";
import { ReceivingContext } from "../../../components/context/ReceivingContext";
import EditModalSave from "./EditModalSave";

const currentUser = decodeUser();

export const EditModal = ({
  editData,
  isOpen,
  onClose,
  getAvailablePOHandler,
}) => {
  const [actualDelivered, setActualDelivered] = useState(null);
  const [batchNo, setBatchNo] = useState(null);
  const [expectedDelivery, setExpectedDelivery] = useState(null);
  const toast = useToast();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [sumQuantity, setSumQuantity] = useState(0);
  const [receivingId, setReceivingId] = useState(null);

  const [submitDataThree, setSubmitDataThree] = useState([]);
  const [submitDataTwo, setSubmitDataTwo] = useState([]);

  const { register } = useForm({
    resolver: yupResolver(),
    mode: "onChange",
    defaultValues: {
      submitData: {
        po_summary_id: editData.id,
        expected_delivery: "",
        actual_delivered: "",
        batch_no: "",
        addedBy: currentUser.userName,
      },
      displayData: {
        id: editData.id,
        prNumber: editData.prNumber,
        prDate: moment(editData.prDate).format("MM/DD/YYYY"),
        poNumber: editData.poNumber,
        poDate: moment(editData.poDate).format("MM/DD/YYYY"),
        itemCode: editData.itemCode,
        itemDescription: editData.itemDescription,
        supplier: editData.supplier,
        uom: editData.uom,
        quantityOrdered: editData.quantityOrdered.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        actualGood: editData.actualGood.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        checkingDate: moment().format("MM/DD/YYYY"),
        actualRemaining: editData.actualRemaining.toLocaleString(undefined, {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }),
        // actualDelivered: editData.actualDelivered,
      },
    },
  });

  // const submitHandler = () => {

  // }

  const expectedDeliveryProvider = (data) => {
    setExpectedDelivery(data);
  };

  const actualDeliveredProvider = (data) => {
    const allowablePercent = editData.quantityOrdered * 0.1;
    const allowableAmount = editData.actualRemaining + allowablePercent;
    if (data > allowableAmount) {
      setActualDelivered("");
      ToastComponent(
        "Warning!",
        "Amount is greater than allowable",
        "warning",
        toast
      );
    } else {
      setActualDelivered(data);
    }
  };

  const batchNoProvider = (data) => {
    setBatchNo(data);
  };

  let submitDataOne = {
    poSummaryId: editData.id,
    itemCode: editData.itemCode,
    itemDescription: editData.itemDescription,
    expectedDelivery: Number(expectedDelivery),
    actualDelivered: Number(actualDelivered),
    batchNo: batchNo,
    totalReject: sumQuantity,
  };

  return (
    <ReceivingContext.Provider
      value={{
        setSumQuantity,
        setSubmitDataTwo,
        setSubmitDataThree,
        setReceivingId,
      }}
    >
      <Flex>
        <Modal size="4xl" isOpen={isOpen} onClose={() => {}} isCentered>
          <ModalOverlay />
          <ModalContent h="95vh">
            <ModalHeader h="130px" boxShadow="xl" bg="primary" color="white">
              <Flex justifyContent="left">
                <Text fontSize="15px" letterSpacing="1px">
                  WAREHOUSE RECEIVING
                </Text>
              </Flex>
            </ModalHeader>
            <ModalCloseButton onClick={onClose} color="white" />
            <ModalBody bg="#F8FAFC">
              <PageScrollEditReceiving>
                <Stack spacing={2} bg="gray.200">
                  <Flex justifyContent="left" p={1} bg="primary">
                    <Text fontSize="13px" fontWeight="semibold" color="white">
                      MATERIALS INFORMATION
                    </Text>
                  </Flex>

                  <Flex justifyContent="space-between" p={1}>
                    <FormLabel w="40%" fontSize="12px">
                      Item Code
                      <Input
                        {...register("displayData.itemCode")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                    <FormLabel w="40%" fontSize="12px">
                      Description
                      <Input
                        {...register("displayData.itemDescription")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                  </Flex>

                  <Flex justifyContent="space-between" mt={2} p={1}>
                    <FormLabel w="40%" fontSize="12px">
                      Supplier
                      <Input
                        {...register("displayData.supplier")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                    <FormLabel w="40%" fontSize="12px">
                      Date of Checking
                      <Input
                        {...register("displayData.checkingDate")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                  </Flex>
                </Stack>

                <Stack spacing={1} mt={2} bg="gray.200">
                  <Flex justifyContent="left" p={1} bg="primary">
                    <Text fontSize="13px" fontWeight="semibold" color="white">
                      RECEIVING INFORMATION
                    </Text>
                  </Flex>

                  <Flex justifyContent="space-between" p={1}>
                    <FormLabel w="40%" fontSize="12px">
                      PO Number
                      <Input
                        {...register("displayData.poNumber")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                    <FormLabel w="40%" fontSize="12px">
                      PO Date
                      <Input
                        {...register("displayData.poDate")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                  </Flex>

                  <Flex justifyContent="space-between" p={1}>
                    <FormLabel w="40%" fontSize="12px">
                      PR Number
                      <Input
                        {...register("displayData.prNumber")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                    <FormLabel w="40%" fontSize="12px">
                      PR Date
                      <Input
                        {...register("displayData.prDate")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                  </Flex>

                  <Flex justifyContent="space-between" p={1}>
                    <FormLabel w="40%" fontSize="12px">
                      Qty. Ordered
                      <Input
                        {...register("displayData.quantityOrdered")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                    <FormLabel w="40%" fontSize="12px">
                      UOM
                      <Input
                        {...register("displayData.uom")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                  </Flex>

                  <Flex justifyContent="space-between" p={1}>
                    <FormLabel w="40%" fontSize="12px">
                      Expected Delivery
                      <Input
                        {...register("submitData.expected_delivery")}
                        fontSize="11px"
                        size="sm"
                        placeholder="Please provide quantity of expected delivery  (Required)"
                        bgColor="yellow.50"
                        onChange={(e) =>
                          expectedDeliveryProvider(e.target.value)
                        }
                      />
                    </FormLabel>
                    <FormLabel w="40%" fontSize="12px">
                      Qty Actual Delivered
                      <Input
                        {...register("submitData.actualDelivered")}
                        fontSize="11px"
                        size="sm"
                        placeholder="Please enter quantity (Required)"
                        bgColor="yellow.50"
                        onChange={(e) =>
                          actualDeliveredProvider(e.target.value)
                        }
                      />
                    </FormLabel>
                  </Flex>

                  <Flex justifyContent="space-between" p={1}>
                    <FormLabel w="40%" fontSize="12px">
                      No. Qty. Actual Good Needed
                      <Input
                        {...register("displayData.actualRemaining")}
                        disabled={true}
                        readOnly={true}
                        _disabled={{ color: "black" }}
                        fontSize="11px"
                        size="sm"
                        bg="gray.300"
                      />
                    </FormLabel>
                    <FormLabel w="40%" fontSize="12px">
                      Batch No.
                      <Input
                        fontSize="11px"
                        size="sm"
                        placeholder="Please provide batch number (Required)"
                        bgColor="yellow.50"
                        onChange={(e) => batchNoProvider(e.target.value)}
                      />
                    </FormLabel>
                  </Flex>
                </Stack>

                <Stack spacing={2} bg="gray.200" mt={2}>
                  <EditAddRejectionModal
                    sumQuantity={sumQuantity}
                    receivingId={receivingId}
                  />
                </Stack>

                {/* <Stack spacing={2} bg="gray.200" mt={2}>
                                    <Flex borderColor='gray.500' borderX='none' borderBottom='none' borderWidth='3px'></Flex>
                                    <Text fontWeight='hairline' fontSize="13px" textAlign='center'>Upon arrival of the vehicle of material at unloading area inspect the following:</Text>
                                    <EditModalChecklist />
                                </Stack> */}
              </PageScrollEditReceiving>
            </ModalBody>

            <ModalFooter bg="#F8FAFC" h="50px">
              {/* <Button colorScheme="blue" onClick={onClose} fontSize="11px">
                                Save
                            </Button> */}
              <EditModalSave
                sumQuantity={sumQuantity}
                receivingId={receivingId}
                po_ReceivingId={submitDataOne.po_Summary_Id}
                submitDataOne={submitDataOne}
                submitDataTwo={submitDataTwo}
                submitDataThree={submitDataThree}
                expectedDelivery={expectedDelivery}
                actualDelivered={actualDelivered}
                getAvailablePOHandler={getAvailablePOHandler}
                batchNo={batchNo}
                isSubmitDisabled={isSubmitDisabled}
                closeModal={onClose}
                editData={editData}
              />
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </ReceivingContext.Provider>
  );
};
