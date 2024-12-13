import {
  Flex,
  Box,
  IconButton,
  Icon,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {
  IconChevronLeft,
  IconPlayerPause,
  IconPlayerPlay,
} from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'

interface RecordingHeaderProps {
  handleEndVisit: () => void
  onStartRecording: () => void
  onToggleRecording: () => void
  isRecording: boolean
}

const RecordingHeader: React.FC<RecordingHeaderProps> = ({
  handleEndVisit,
  onStartRecording,
  onToggleRecording,
  isRecording,
}) => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef = useRef(null)

  const handleBackClick = () => {
    if (isRecording) {
      onToggleRecording()
    }
    navigate(-1)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" bg="#F5F5F7" p={4}>
      <Box>
        <Flex alignItems="center">
          <IconButton
            aria-label="Back"
            icon={<Icon as={IconChevronLeft} boxSize={6} />}
            variant="ghost"
            mr={4}
            onClick={onOpen}
          />
          <Text>Visit in Progress: {isRecording ? 'Recording' : 'Paused'}</Text>
        </Flex>
      </Box>
      <Flex alignItems="center" columnGap="2em">
        <Button
          bg="#798698"
          color="white"
          borderRadius="full"
          px={4}
          py={2}
          display="flex"
          alignItems="center"
          _hover={{ bg: '#346AAC' }}
          _focus={{ boxShadow: 'outline' }}
          onClick={isRecording ? onToggleRecording : onStartRecording}
        >
          <Icon
            as={isRecording ? IconPlayerPause : IconPlayerPlay}
            boxSize={6}
            mr={2}
          />
          <Text>{isRecording ? 'Pause' : 'Record'}</Text>
        </Button>
        <Button
          bg="#798698"
          color="white"
          borderRadius="full"
          px={4}
          py={2}
          display="flex"
          alignItems="center"
          _hover={{ bg: '#346AAC' }}
          _focus={{ boxShadow: 'outline' }}
          mr={4}
          onClick={handleEndVisit}
        >
          <Text>End Visit</Text>
        </Button>
      </Flex>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isRecording ? 'Pause Recording' : 'Pause Appointment'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isRecording
              ? 'Going back to the main dashboard will pause the recording.'
              : 'Going back to the main dashboard will pause the appointment.'}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleBackClick}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Stay With Patient
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default RecordingHeader
