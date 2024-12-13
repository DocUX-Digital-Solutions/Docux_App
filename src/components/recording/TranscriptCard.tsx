import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface TranscriptCardProps {
  children: React.ReactNode
  header?: React.ReactNode
}

const TranscriptCard: React.FC<TranscriptCardProps> = ({
  children,
  header,
}) => {
  return (
    <Box
      bg="white"
      p={4}
      shadow="md"
      borderWidth="2px"
      borderRadius="lg"
      flex="1"
      minHeight="100%"
    >
      {header && (
        <Flex justifyContent="space-between" mb={4}>
          {header}
        </Flex>
      )}
      <Flex direction="column" align="flex-start" textAlign={'left'}>
        {children}
      </Flex>
    </Box>
  )
}

export default TranscriptCard
