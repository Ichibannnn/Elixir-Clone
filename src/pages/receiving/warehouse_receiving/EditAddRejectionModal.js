import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, FormLabel, Input, Select, Text } from '@chakra-ui/react'
import React from 'react'

const EditAddRejectionModal = () => {
    return (
        <Box>
            <Accordion allowToggle defaultIndex={[1]}>
                <AccordionItem>
                    <Flex bg="primary" color="white" justifyContent='space-between' alignItems="center">
                        <AccordionButton p={1}>
                            <Text fontSize="13px" fontWeight="semibold"> REJECTION INFORMATION <AccordionIcon /> </Text>
                        </AccordionButton>
                        <Button colorScheme="red" size="xs" mr={1} borderRadius="none">
                            Add Rejection
                        </Button>
                    </Flex>

                    <AccordionPanel>
                        <Flex justifyContent="space-between">
                            <FormLabel w="40%" fontSize="12px" p={0}>
                                Quantity
                                <Input
                                    fontSize="11px"
                                    size="sm"
                                    bg="white"
                                    placeholder='Quantity'
                                    type='number'
                                />
                            </FormLabel>
                            <FormLabel w="40%" fontSize="12px">
                                Remarks
                                <Select fontSize="11px" size="sm" placeholder='Select Reason' border="1px" borderColor="gray.400">
                                    <option>Select Reason</option>
                                </Select>
                            </FormLabel>
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box >
    )
}

export default EditAddRejectionModal