import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import QRCode from 'qrcode.react'
import { useAuth } from '../../hooks/useAuth'

interface TOTPSetupModalProps {
  isOpen: boolean
  onClose: () => void
  setupUri: string
}

const TOTPSetupModal: React.FC<TOTPSetupModalProps> = ({
  isOpen,
  onClose,
  setupUri,
}) => {
  const [totpCode, setTotpCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { confirmTOTP } = useAuth()

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)
    try {
      await confirmTOTP(totpCode)
      onClose()
    } catch (err) {
      setError('Invalid TOTP code. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>TOTP Setup</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Scan the QR code below with your authenticator app:</Text>
          <QRCode value={setupUri} />
          <FormControl mt={4} isInvalid={!!error}>
            <FormLabel>Enter TOTP Code</FormLabel>
            <Input
              value={totpCode}
              onChange={e => setTotpCode(e.target.value)}
              placeholder="Enter the code from your app"
            />
            {error && <Text color="red.500">{error}</Text>}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Verify
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TOTPSetupModal
