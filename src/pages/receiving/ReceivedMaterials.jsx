import {
  Box,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Stack,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Td,
  Portal,
  Button,
  useToast,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuItem,
  IconButton,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Tfoot,
  ModalFooter,
  ButtonGroup,
  Badge,
  Select,
} from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { useEffect } from "react";
import { BsFillPrinterFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { GrView } from "react-icons/gr";
import { AiOutlineMore } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { AiFillPrinter } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import PageScroll from "../../utils/PageScroll";
import request from "../../services/ApiClient";
import { ToastComponent } from "../../components/Toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { decodeUser } from "../../services/decode-user";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import moment from "moment";
import Barcode from "react-barcode";
import { useReactToPrint } from "react-to-print";

const ReceivedMaterials = () => {
  // const [pO, setWarehouseData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useToast();
  const currentUser = decodeUser();
  // const [viewData, setViewData] = useState([]);
  // const [editData, setEditData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [pageTotal, setPageTotal] = useState(undefined);
  const [printData, setPrintData] = useState({
    warehouseId: "",
    itemCode: "",
    itemDescription: "",
  });

  // OPEN MODAL FOR PRINTER
  const {
    isOpen: isPrintOpen,
    onClose: closePrint,
    onOpen: openPrint,
  } = useDisclosure();

  // FETCH API ROLES:
  const fetchReceivedMatsApi = async (pageNumber, pageSize, search) => {
    const response = await request.get(
      `Warehouse/GetAllReceivedMaterialsPaginationOrig?PageNumber=${pageNumber}&PageSize=${pageSize}&search=${search}`
    );

    return response.data;
  };

  //PAGINATION
  const outerLimit = 2;
  const innerLimit = 2;
  const {
    currentPage,
    setCurrentPage,
    pagesCount,
    pages,
    setPageSize,
    pageSize,
  } = usePagination({
    total: pageTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: { currentPage: 1, pageSize: 5 },
  });

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
  };

  const handlePageSizeChange = (e) => {
    const pageSize = Number(e.target.value);
    setPageSize(pageSize);
  };

  //SHOW MAIN MENU DATA----
  const getReceivedMatsHandler = () => {
    fetchReceivedMatsApi(currentPage, pageSize, search).then((res) => {
      setIsLoading(false);
      setWarehouseData(res);
      setPageTotal(res.totalCount);
    });
  };

  useEffect(() => {
    getReceivedMatsHandler();

    return () => {
      setWarehouseData([]);
    };
  }, [currentPage, pageSize, search]);

  // SEARCH
  const searchHandler = (inputValue) => {
    setSearch(inputValue);
    console.log(inputValue);
  };

  // PRINT
  const printHandler = ({ id, itemCode, itemDescription }) => {
    if (id) {
      setPrintData({
        warehouseId: id,
        itemCode: itemCode,
        itemDescription: itemDescription,
      });
      openPrint();
    } else {
      setPrintData({
        warehouseId: "",
        itemCode: "",
        itemDescription: "",
      });
    }
  };

  //FOR DRAWER (Drawer / Drawer Tagging)
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      color="fontColor"
      h="auto"
      w="full"
      borderRadius="md"
      flexDirection="column"
      bg="background"
    >
      <Flex bg="btnColor" borderRadius="10px 10px 0px 0px" w="20%" pl={2}>
        {/* <Icon as={BsTrashFill} mt={2} color="white" fontSize="18px" /> */}
        <Text p={2} fontWeight="semibold" fontSize="12px" color="white">
          Received Materials
        </Text>
      </Flex>

      <Flex
        w="full"
        bg="form"
        h="100%"
        borderRadius="md"
        flexDirection="column"
      >
        <Flex w="full" borderRadius="md" bg="form" h="6%" position="sticky">
          <HStack p={2} w="20%" mt={3}>
            <InputGroup size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<FiSearch bg="black" fontSize="18px" />}
              />
              <Input
                borderRadius="lg"
                fontSize="13px"
                type="text"
                border="none"
                bg="#E9EBEC"
                placeholder="Search PO Number"
                borderColor="gray.400"
                _hover={{ borderColor: "gray.400" }}
                onChange={(e) => searchHandler(e.target.value)}
              />
            </InputGroup>
          </HStack>
        </Flex>

        <Flex w="full" flexDirection="column" gap={2} p={3}>
          <PageScroll>
            {isLoading ? (
              <Stack width="full">
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            ) : (
              <Table
                size="md"
                width="full"
                border="none"
                boxShadow="md"
                bg="gray.200"
                variant="striped"
              >
                <Thead bg="primary">
                  <Tr>
                    <Th color="white" fontSize="9px">
                      Warehouse ID
                    </Th>
                    <Th color="white" fontSize="9px">
                      Item Code
                    </Th>
                    <Th color="white" fontSize="9px">
                      Item Description
                    </Th>
                    <Th color="white" fontSize="9px">
                      Actual Good
                    </Th>
                    <Th color="white" fontSize="9px">
                      Print
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {warehouseData?.warehouse?.map((items) => (
                    <Tr key={items.id}>
                      <Td fontSize="11px">{items.id}</Td>
                      <Td fontSize="11px">{items.itemCode}</Td>
                      <Td fontSize="11px">{items.itemDescription}</Td>
                      <Td fontSize="11px">{items.actualGood}</Td>
                      <Td pl={0}>
                        <Flex>
                          <Box>
                            <Button
                              bg="none"
                              onClick={() => printHandler(items)}
                            >
                              <BsFillPrinterFill />
                            </Button>
                          </Box>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </PageScroll>

          <Flex justifyContent="space-between">
            <HStack>
              <Badge colorScheme="cyan">
                <Text color="secondary">
                  Number of Records: {warehouseData.warehouse?.length}
                </Text>
              </Badge>
            </HStack>

            <Stack>
              <Pagination
                pagesCount={pagesCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              >
                <PaginationContainer>
                  <PaginationPrevious
                    bg="primary"
                    color="white"
                    p={1}
                    _hover={{ bg: "green", color: "white" }}
                    size="sm"
                  >
                    {"<<"}
                  </PaginationPrevious>
                  <PaginationPageGroup ml={1} mr={1}>
                    {pages.map((page) => (
                      <PaginationPage
                        _hover={{ bg: "green", color: "white" }}
                        _focus={{ bg: "green" }}
                        p={3}
                        bg="primary"
                        color="white"
                        key={`pagination_page_${page}`}
                        page={page}
                        size="sm"
                      />
                    ))}
                  </PaginationPageGroup>
                  <HStack>
                    <PaginationNext
                      bg="primary"
                      color="white"
                      p={1}
                      _hover={{ bg: "green", color: "white" }}
                      size="sm"
                      mb={2}
                    >
                      {">>"}
                    </PaginationNext>
                    <Select
                      onChange={handlePageSizeChange}
                      bg="#FFFFFF"
                      // size="sm"
                      mb={2}
                      variant="outline"
                    >
                      <option value={Number(5)}>5</option>
                      <option value={Number(10)}>10</option>
                      <option value={Number(25)}>25</option>
                      <option value={Number(50)}>50</option>
                    </Select>
                  </HStack>
                </PaginationContainer>
              </Pagination>
            </Stack>
          </Flex>

          <Flex justifyContent="end">
            {isPrintOpen && (
              <PrintModal
                isOpen={openPrint}
                onClose={closePrint}
                printData={printData}
                getReceivedMatsHandler={getReceivedMatsHandler}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ReceivedMaterials;

const PrintModal = ({ isOpen, onClose, printData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="xl">
      <ModalContent>
        <ModalHeader>
          <Flex justifyContent="center">
            <AiFillPrinter fontSize="50px" />
          </Flex>
        </ModalHeader>
        <ModalBody mt={5}>
          <VStack spacing={0} justifyContent="center" ref={componentRef}>
            <Text>{printData?.itemCode}</Text>
            <Text>{printData?.itemDescription}</Text>
            {/* <Text>Expiration Days: {printData?.expirationDays}</Text> */}
            {/* <Text>Expiration Date: {printData?.expirationDate}</Text> */}
            <VStack spacing={0} w="90%" ml={4} justifyContent="center">
              <Barcode width={2} height={30} value={printData?.warehouseId} />
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter mt={10}>
          <ButtonGroup size="xs">
            <Button colorScheme="blue" onClick={handlePrint}>
              Print
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
