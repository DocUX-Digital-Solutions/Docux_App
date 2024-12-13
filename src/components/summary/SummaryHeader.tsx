import React from 'react'
import { Flex, Box, IconButton, Icon, Text, Button } from '@chakra-ui/react'
import { IconChevronLeft, IconEdit } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

interface SummaryHeaderProps {
  handleSubmit: () => void
  handleSave: () => void
  onEditToggle: () => void
  handleCancelEdit: () => void
  isEditing: boolean
  isUpdating: boolean
  isSubmitting: boolean
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({
  handleSubmit,
  handleSave,
  onEditToggle,
  handleCancelEdit,
  isEditing,
  isUpdating,
  isSubmitting,
}) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" bg="#F5F5F7" p={4}>
      <Box>
        <Flex alignItems="center">
          <IconButton
            aria-label="Edit"
            icon={<Icon as={IconChevronLeft} boxSize={6} />}
            variant="ghost"
            mr={4}
            onClick={handleBackClick}
          />
          <Text>Visit in Progress: Summary</Text>
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
          onClick={isEditing ? handleCancelEdit : onEditToggle}
        >
          <Icon as={IconEdit} boxSize={6} mr={2} />
          <Text>{isEditing ? 'Cancel Edit' : 'Edit'}</Text>
        </Button>
        <Button
          bg="#356AAC"
          color="white"
          borderRadius="full"
          px={4}
          py={2}
          display="flex"
          alignItems="center"
          _hover={{ bg: '#346AAC' }}
          _focus={{ boxShadow: 'outline' }}
          mr={4}
          isLoading={isUpdating || isSubmitting}
          cursor={isUpdating ? 'wait' : 'pointer'}
          onClick={isEditing ? handleSave : handleSubmit}
        >
          <Text>{isEditing ? 'Save' : 'Submit'}</Text>
        </Button>
      </Flex>
    </Flex>
  )
}

export default SummaryHeader
