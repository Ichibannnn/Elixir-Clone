import React, { useEffect, useState } from 'react'
import { ToastComponent } from '../../../components/Toast'
import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useToast } from '@chakra-ui/react'
import request from '../../../services/ApiClient'

const CancelModal = ({ isOpen, onClose, getAvailablePOHandler, poId }) => {
    const [reasons, setReasons] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)

    const toast = useToast()

    //FETCH REASON API
    const fetchReasonApi = async () => {
        try {
            const res = await request.get('Reason/GetAllActiveReasons')
            setReasons(res.data)
        } catch (error) { }
    }

    useEffect(() => {
        try {
            fetchReasonApi()
        } catch (error) { }
    }, [])

    //REASON HANDLER
    const reasonHandler = (data) => {
        if (data) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }

    return (
        <Flex>
            <Modal size='xl' isOpen={isOpen} onClose={() => { }} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg="primary" color="white">
                        <Flex justifyContent="left">
                            <Text fontSize="15px">
                                Cancel Materials
                            </Text>
                        </Flex>
                    </ModalHeader>
                    <Flex borderColor='gray.100' borderWidth='2px' borderX='none' borderTop='none'></Flex>
                    <ModalCloseButton onClick={onClose} color="white" />

                    <ModalBody>
                        <Flex justifyContent="center" p={2} flexDirection="column">
                            <Text fontSize="15px">Are you sure to cancel this materials?</Text>
                            {
                                reasons.length > 0 ? (<Select
                                    onChange={(e) => reasonHandler(e.target.value)}
                                    placeholder="Select Reason"
                                >
                                    {reasons.map(reason => (
                                        <option key={reason.id} value={reason.reasonName}>{reason.reasonName}</option>
                                    ))}

                                </Select>) : "loading"
                            }
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Flex justifyContent="end" gap={2}>
                            <Button colorScheme="blue" isDisabled={isDisabled}>
                                Yes
                            </Button>
                            <Button onClick={onClose}>
                                No
                            </Button>
                        </Flex>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default CancelModal