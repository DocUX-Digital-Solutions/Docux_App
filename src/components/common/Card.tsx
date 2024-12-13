import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children, header }) => {
  return (
    <Box bg="white" p={4} shadow="md" borderWidth="2px" borderRadius="lg">
      {header && (
        <Flex justifyContent="space-between" mb={4}>
          {header}
        </Flex>
      )}
      <Flex direction="column" align="flex-start">
        {children}
      </Flex>
    </Box>
  )
}

export default Card
