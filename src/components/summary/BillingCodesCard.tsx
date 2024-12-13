import { Box, Input, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const BillingCodesCard: React.FC = () => {
  return (
    <Box
      bg="white"
      p={4}
      shadow="md"
      borderWidth="2px"
      borderRadius="lg"
      flex="1"
      minHeight="100%"
      backgroundColor="#DDECFF"
    >
      <Flex
        align={'flex-start'}
        direction={'column'}
        justifyContent="space-between"
        mb={4}
      >
        <Text fontWeight="bold" color="rgb(52,106,172)">
          BILLING CODES
        </Text>
        <Input backgroundColor={'white'} placeholder="Search for code" />
      </Flex>
      <Flex direction="column" align="flex-start">
        <Text fontWeight="bold" color="rgb(54,52,52)" mb={2}>
          SUGGESTED CPT CODES
        </Text>
      </Flex>
    </Box>
  )
}

export default BillingCodesCard
