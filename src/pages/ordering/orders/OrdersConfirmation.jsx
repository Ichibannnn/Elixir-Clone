import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { RiFileList3Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import PageScrollImport from "../../../components/PageScrollImport";
import { ToastComponent } from "../../../components/Toast";
import request from "../../../services/ApiClient";
import PageScroll from "../../../utils/PageScroll";

const OrdersConfirmation = ({
  isOpen,
  onOpen,
  onClose,
  errorData,
  setErrorData,
  isLoading,
  setIsLoading,
}) => {
  console.log("Open Orders Confimation ");

  const toast = useToast();

  const {
    isOpen: isFiltered,
    onClose: closeFiltered,
    onOpen: openFiltered,
  } = useDisclosure();

  const duplicateList = errorData?.duplicateList?.map((list) => {
    return {
      trasactId: list?.trasactId,
      orderDate: list.orderDate,
      dateNeeded: list.dateNeeded,
      customercode: list.customercode,
      customerName: list.customerName,
      category: list.category,
      itemCode: list.itemCode,
      itemdDescription: list.itemdDescription,
      uom: list.uom,
      quantityOrdered: list.quantityOrdered,
    };
  });
  // console.log(duplicateList);

  const filteredOrders = errorData?.availableImport?.map((list) => {
    return {
      trasactId: list?.trasactId,
      customercode: list?.customercode,
      customerName: list?.customerName,
      orderNo: list?.orderNo,
      orderDate: moment(list?.orderDate).format("yyyy-MM-DD"),
      dateNeeded: moment(list?.dateNeeded).format("yyyy-MM-DD"),
      itemCode: list?.itemCode,
      itemdDescription: list?.itemdDescription,
      uom: list?.uom,
      quantityOrdered: list?.quantityOrdered,
      category: list?.category,
    };
  });

  const itemCodesExist = errorData?.itemCodesExist?.map((list) => {
    return {
      trasactId: list?.trasactId,
      customercode: list?.customercode,
      customerName: list?.customerName,
      orderNo: list?.orderNo,
      orderDate: moment(list?.orderDate).format("yyyy-MM-DD"),
      dateNeeded: moment(list?.dateNeeded).format("yyyy-MM-DD"),
      itemCode: list?.itemCode,
      itemdDescription: list?.itemdDescription,
      uom: list?.uom,
      quantityOrdered: list?.quantityOrdered,
      category: list?.category,
    };
  });

  const uomNotExist = errorData?.uomNotExist?.map((list) => {
    return {
      trasactId: list?.trasactId,
      customercode: list?.customercode,
      customerName: list?.customerName,
      orderNo: list?.orderNo,
      orderDate: moment(list?.orderDate).format("yyyy-MM-DD"),
      dateNeeded: moment(list?.dateNeeded).format("yyyy-MM-DD"),
      itemCode: list?.itemCode,
      itemdDescription: list?.itemdDescription,
      uom: list?.uom,
      quantityOrdered: list?.quantityOrdered,
      category: list?.category,
    };
  });

  const customerNameNotExist = errorData?.customerNameNotExist?.map((list) => {
    return {
      trasactId: list?.trasactId,
      customercode: list?.customercode,
      customerName: list?.customerName,
      orderNo: list?.orderNo,
      orderDate: moment(list?.orderDate).format("yyyy-MM-DD"),
      dateNeeded: moment(list?.dateNeeded).format("yyyy-MM-DD"),
      itemCode: list?.itemCode,
      itemdDescription: list?.itemdDescription,
      uom: list?.uom,
      quantityOrdered: list?.quantityOrdered,
      category: list?.category,
    };
  });

  const previousDateNeeded = errorData?.previousDateNeeded?.map((list) => {
    return {
      trasactId: list?.trasactId,
      customercode: list?.customercode,
      customerName: list?.customerName,
      orderNo: list?.orderNo,
      orderDate: moment(list?.orderDate).format("yyyy-MM-DD"),
      dateNeeded: moment(list?.dateNeeded).format("yyyy-MM-DD"),
      itemCode: list?.itemCode,
      itemdDescription: list?.itemdDescription,
      uom: list?.uom,
      quantityOrdered: list?.quantityOrdered,
      category: list?.category,
    };
  });

  const resultArray = filteredOrders?.map((list) => {
    return {
      trasactId: list?.trasactId,
      customercode: list?.customercode,
      customerName: list?.customerName,
      orderNo: list?.orderNo,
      batchNo: list?.batchNo,
      orderDate: list?.orderDate,
      dateNeeded: list?.dateNeeded,
      itemCode: list?.itemCode,
      itemdDescription: list?.itemdDescription,
      uom: list?.uom,
      quantityOrdered: list?.quantityOrdered,
      category: list?.category,
    };
  });

  const validationAvailableToSync = () => {
    Swal.fire({
      title: "Confirmation!",
      text: "Are you sure you want to sync these orders?",
      icon: "info",
      color: "white",
      background: "#1B1C1D",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#CBD1D8",
      confirmButtonText: "Yes",
      heightAuto: false,
      width: "40em",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const res = request
            .post(
              `Ordering/AddNewOrders`,
              resultArray.map((item) => {
                return {
                  trasactId: item?.trasactId,
                  customercode: item?.customercode,
                  customerName: item?.customerName,
                  orderNo: item?.orderNo,
                  orderDate: moment(item?.orderDate).format("yyyy-MM-DD"),
                  dateNeeded: moment(item?.dateNeeded).format("yyyy-MM-DD"),
                  itemCode: item?.itemCode,
                  itemdDescription: item?.itemdDescription,
                  uom: item?.uom,
                  quantityOrdered: item?.quantityOrdered,
                  category: item?.category,
                };
              })
            )
            .then((res) => {
              ToastComponent("Success", "Orders Synced!", "success", toast);
              onClose();
              setIsLoading(false);
            })
            .catch((err) => {
              setIsLoading(false);
              setErrorData(err.response.data);
              if (err.response.data) {
                onClose();
                onOpen();
              }
            });
        } catch (error) {}
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent
        color="white"
        bg="linear-gradient(rgba(0, 0, 0, 0.850),rgba(0, 0, 0, 3))"
      >
        <ModalHeader>
          <Flex justifyContent="left">
            <Text fontSize="11px" color="white">
              Orders were not synced due to the following reasons:
            </Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <PageScroll>
          <ModalBody>
            <Accordion allowToggle>
              {/* DUPLICATED LIST */}
              {duplicateList?.length > 0 ? (
                <AccordionItem bgColor="gray.200">
                  <Flex>
                    <AccordionButton color="white" fontWeight="semibold">
                      <Box
                        flex="1"
                        textAlign="left"
                        color="black"
                        fontSize="13px"
                        fontWeight="semibold"
                      >
                        Duplicated Lists{" "}
                        <Badge color="red">{duplicateList?.length}</Badge>
                      </Box>
                      <AccordionIcon color="secondary" />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <PageScrollImport maxHeight="470px">
                      {duplicateList ? (
                        <Table variant="striped" size="sm">
                          <Thead bgColor="gray.600">
                            <Tr>
                              <Th color="white" fontSize="9px">
                                Line
                              </Th>
                              <Th color="white" fontSize="9px">
                                Transact ID
                              </Th>
                              <Th color="white" fontSize="9px">
                                Order Date
                              </Th>
                              <Th color="white" fontSize="9px">
                                Date Needed
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Name
                              </Th>
                              <Th color="white" fontSize="9px">
                                Category
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Description
                              </Th>
                              <Th color="white" fontSize="9px">
                                UOM
                              </Th>
                              <Th color="white" fontSize="9px">
                                Quantity Order
                              </Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {duplicateList?.map((d, i) => (
                              <Tr key={i}>
                                <Td color="gray.600" fontSize="11px">
                                  {i + 1}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.trasactId}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.orderDate).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.dateNeeded).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customercode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customerName}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.category}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemCode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemdDescription}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.uom}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.quantityOrdered}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Flex justifyContent="center" mt="30px">
                          <VStack>
                            <RiFileList3Fill fontSize="200px" />
                            <Text color="white">
                              There are no duplicated lists on this file
                            </Text>
                          </VStack>
                        </Flex>
                      )}
                    </PageScrollImport>
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                ""
              )}

              {/* FILTERED ORDERS */}
              {filteredOrders?.length > 0 ? (
                <AccordionItem bgColor="teal.500">
                  <Flex>
                    <AccordionButton color="white" fontWeight="semibold">
                      <Box
                        flex="1"
                        textAlign="left"
                        color="white"
                        fontSize="13px"
                        fontWeight="semibold"
                      >
                        Available for syncing{" "}
                        <Badge color="green">{filteredOrders?.length}</Badge>
                      </Box>
                      <AccordionIcon color="secondary" />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <PageScrollImport>
                      {filteredOrders ? (
                        <Table variant="striped" size="sm">
                          <Thead bgColor="gray.600">
                            <Tr>
                              <Th color="white" fontSize="9px">
                                Line
                              </Th>
                              <Th color="white" fontSize="9px">
                                Transact ID
                              </Th>
                              <Th color="white" fontSize="9px">
                                Order Date
                              </Th>
                              <Th color="white" fontSize="9px">
                                Date Needed
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Name
                              </Th>
                              <Th color="white" fontSize="9px">
                                Category
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Description
                              </Th>
                              <Th color="white" fontSize="9px">
                                UOM
                              </Th>
                              <Th color="white" fontSize="9px">
                                Quantity Order
                              </Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {filteredOrders?.map((d, i) => (
                              <Tr key={i}>
                                <Td color="gray.600" fontSize="11px">
                                  {i + 1}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.trasactId}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.orderDate).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.dateNeeded).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customercode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customerName}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.category}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemCode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemdDescription}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.uom}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.quantityOrdered}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Flex justifyContent="center" mt="30px">
                          <VStack>
                            <RiFileList3Fill fontSize="200px" />
                            <Text color="white">
                              There are no duplicated lists on this file
                            </Text>
                          </VStack>
                        </Flex>
                      )}
                    </PageScrollImport>
                    {filteredOrders ? (
                      <Flex justifyContent="end">
                        <Button
                          onClick={() => validationAvailableToSync()}
                          size="sm"
                          _hover={{ bgColor: "accent", color: "white" }}
                          colorScheme="blue"
                          isLoading={isLoading}
                        >
                          Sync
                        </Button>
                      </Flex>
                    ) : (
                      ""
                    )}
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                ""
              )}

              {/* ITEM CODE EXIST */}
              {itemCodesExist?.length > 0 ? (
                <AccordionItem bgColor="gray.200">
                  <Flex>
                    <AccordionButton color="white" fontWeight="semibold">
                      <Box
                        flex="1"
                        textAlign="left"
                        color="black"
                        fontSize="13px"
                        fontWeight="semibold"
                      >
                        Item Code Does Exist{" "}
                        <Badge color="red">{itemCodesExist?.length}</Badge>
                      </Box>
                      <AccordionIcon color="secondary" />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <PageScrollImport maxHeight="470px">
                      {itemCodesExist ? (
                        <Table variant="striped" size="sm">
                          <Thead bgColor="gray.600">
                            <Tr>
                              <Th color="white" fontSize="9px">
                                Line
                              </Th>
                              <Th color="white" fontSize="9px">
                                Transact ID
                              </Th>
                              <Th color="white" fontSize="9px">
                                Order Date
                              </Th>
                              <Th color="white" fontSize="9px">
                                Date Needed
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Name
                              </Th>
                              <Th color="white" fontSize="9px">
                                Category
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Description
                              </Th>
                              <Th color="white" fontSize="9px">
                                UOM
                              </Th>
                              <Th color="white" fontSize="9px">
                                Quantity Order
                              </Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {itemCodesExist?.map((d, i) => (
                              <Tr key={i}>
                                <Td color="gray.600" fontSize="11px">
                                  {i + 1}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.trasactId}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.orderDate).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.dateNeeded).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customercode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customerName}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.category}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemCode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemdDescription}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.uom}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.quantityOrdered}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Flex justifyContent="center" mt="30px">
                          <VStack>
                            <RiFileList3Fill fontSize="200px" />
                            <Text color="white">
                              There are no duplicated item code lists on this
                              file
                            </Text>
                          </VStack>
                        </Flex>
                      )}
                    </PageScrollImport>
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                ""
              )}

              {/* UOM DOEST NO EXIST */}
              {uomNotExist?.length > 0 ? (
                <AccordionItem bgColor="gray.200">
                  <Flex>
                    <AccordionButton color="white" fontWeight="semibold">
                      <Box
                        flex="1"
                        textAlign="left"
                        color="black"
                        fontSize="13px"
                        fontWeight="semibold"
                      >
                        UOM does not exist{" "}
                        <Badge color="red">{uomNotExist?.length}</Badge>
                      </Box>
                      <AccordionIcon color="secondary" />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <PageScrollImport maxHeight="470px">
                      {uomNotExist ? (
                        <Table variant="striped" size="sm">
                          <Thead bgColor="gray.600">
                            <Tr>
                              <Th color="white" fontSize="9px">
                                Liness
                              </Th>
                              <Th color="white" fontSize="9px">
                                Transact ID
                              </Th>
                              <Th color="white" fontSize="9px">
                                Order Date
                              </Th>
                              <Th color="white" fontSize="9px">
                                Date Needed
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Name
                              </Th>
                              <Th color="white" fontSize="9px">
                                Category
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Description
                              </Th>
                              <Th color="white" fontSize="9px">
                                UOM
                              </Th>
                              <Th color="white" fontSize="9px">
                                Quantity Order
                              </Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {uomNotExist?.map((d, i) => (
                              <Tr key={i}>
                                <Td color="gray.600" fontSize="11px">
                                  {i + 1}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.trasactId}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.orderDate).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.dateNeeded).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customercode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customerName}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.category}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemCode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemdDescription}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.uom}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.quantityOrdered}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Flex justifyContent="center" mt="30px">
                          <VStack>
                            <RiFileList3Fill fontSize="200px" />
                            <Text color="white">
                              There are no duplicated uom lists on this file
                            </Text>
                          </VStack>
                        </Flex>
                      )}
                    </PageScrollImport>
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                ""
              )}

              {/* CUSTOMER CODE DOES NOT EXIST */}
              {customerNameNotExist?.length > 0 ? (
                <AccordionItem bgColor="gray.200">
                  <Flex>
                    <AccordionButton color="white" fontWeight="semibold">
                      <Box
                        flex="1"
                        textAlign="left"
                        color="black"
                        fontSize="13px"
                        fontWeight="semibold"
                      >
                        Customer Code does not exist{" "}
                        <Badge color="red">
                          {customerNameNotExist?.length}
                        </Badge>
                      </Box>
                      <AccordionIcon color="secondary" />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <PageScrollImport maxHeight="470px">
                      {customerNameNotExist ? (
                        <Table variant="striped" size="sm">
                          <Thead bgColor="gray.600">
                            <Tr>
                              <Th color="white" fontSize="9px">
                                Liness
                              </Th>
                              <Th color="white" fontSize="9px">
                                Transact ID
                              </Th>
                              <Th color="white" fontSize="9px">
                                Order Date
                              </Th>
                              <Th color="white" fontSize="9px">
                                Date Needed
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Name
                              </Th>
                              <Th color="white" fontSize="9px">
                                Category
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Description
                              </Th>
                              <Th color="white" fontSize="9px">
                                UOM
                              </Th>
                              <Th color="white" fontSize="9px">
                                Quantity Order
                              </Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {customerNameNotExist?.map((d, i) => (
                              <Tr key={i}>
                                <Td color="gray.600" fontSize="11px">
                                  {i + 1}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.trasactId}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.orderDate).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.dateNeeded).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customercode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customerName}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.category}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemCode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemdDescription}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.uom}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.quantityOrdered}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Flex justifyContent="center" mt="30px">
                          <VStack>
                            <RiFileList3Fill fontSize="200px" />
                            <Text color="white">
                              There are no duplicated customer code lists on
                              this file
                            </Text>
                          </VStack>
                        </Flex>
                      )}
                    </PageScrollImport>
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                ""
              )}

              {/* Invalid Date Needed */}
              {previousDateNeeded?.length > 0 ? (
                <AccordionItem bgColor="gray.200">
                  <Flex>
                    <AccordionButton color="white" fontWeight="semibold">
                      <Box
                        flex="1"
                        textAlign="left"
                        color="black"
                        fontSize="13px"
                        fontWeight="semibold"
                      >
                        Invalid Date Needed{" "}
                        <Badge color="red">{previousDateNeeded?.length}</Badge>
                      </Box>
                      <AccordionIcon color="secondary" />
                    </AccordionButton>
                  </Flex>

                  <AccordionPanel pb={4}>
                    <PageScrollImport maxHeight="470px">
                      {previousDateNeeded ? (
                        <Table variant="striped" size="sm">
                          <Thead bgColor="gray.600">
                            <Tr>
                              <Th color="white" fontSize="9px">
                                Line
                              </Th>
                              <Th color="white" fontSize="9px">
                                Transact ID
                              </Th>
                              <Th color="white" fontSize="9px">
                                Order Date
                              </Th>
                              <Th color="white" fontSize="9px">
                                Date Needed
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Customer Name
                              </Th>
                              <Th color="white" fontSize="9px">
                                Category
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Code
                              </Th>
                              <Th color="white" fontSize="9px">
                                Item Description
                              </Th>
                              <Th color="white" fontSize="9px">
                                UOM
                              </Th>
                              <Th color="white" fontSize="9px">
                                Quantity Order
                              </Th>
                            </Tr>
                          </Thead>

                          <Tbody>
                            {previousDateNeeded?.map((d, i) => (
                              <Tr key={i}>
                                <Td color="gray.600" fontSize="11px">
                                  {i + 1}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.trasactId}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.orderDate).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {moment(d?.dateNeeded).format("yyyy-MM-DD")}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customercode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.customerName}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.category}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemCode}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.itemdDescription}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.uom}
                                </Td>
                                <Td color="gray.600" fontSize="11px">
                                  {d?.quantityOrdered}
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      ) : (
                        <Flex justifyContent="center" mt="30px">
                          <VStack>
                            <RiFileList3Fill fontSize="200px" />
                            <Text color="white">
                              There are no duplicated lists on this file
                            </Text>
                          </VStack>
                        </Flex>
                      )}
                    </PageScrollImport>
                  </AccordionPanel>
                </AccordionItem>
              ) : (
                ""
              )}
            </Accordion>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </PageScroll>
      </ModalContent>
    </Modal>
  );
};

export default OrdersConfirmation;
