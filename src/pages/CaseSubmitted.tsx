import React from 'react'
import {
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
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

const CaseSubmitted: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { assessmentText } = location.state || {}

  const { isOpen, onOpen } = useDisclosure()

  React.useEffect(() => {
    onOpen()
  }, [onOpen])

  const handleNextPatient = () => {
    // todo implement
    navigate('/next-patient')
  }

  const handlePrintAWS = () => {
    // todo implement
  }

  const handleClose = () => {
    navigate('/home')
  }

  return (
    <Box
      height="100vh"
      bg="gray.100"
      display="flex"
      backgroundImage="url('/assets/images/login-background.png')"
      alignItems="center"
      justifyContent="center"
    >
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent borderRadius="15px">
          <ModalHeader>Case Submitted</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              {assessmentText
                ? assessmentText
                    .split('\n')
                    .map((line: string, index: number) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                : 'No assessment text available'}
            </Text>{' '}
          </ModalBody>
          <ModalFooter>
            <Flex gap={10}>
              <Button
                colorScheme="blue"
                borderRadius="20px"
                onClick={handleNextPatient}
              >
                Next Patient
              </Button>
              <Button
                colorScheme="teal"
                borderRadius="20px"
                onClick={handlePrintAWS}
              >
                Print AWS
              </Button>
              <Button
                variant="outline"
                borderRadius="20px"
                onClick={handleClose}
              >
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default CaseSubmitted
