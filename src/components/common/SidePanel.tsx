import { Box, Flex, Image } from '@chakra-ui/react'

const SidePanel = () => {
  return (
    <Box
      w="100px"
      minW="100px"
      maxW="100px"
      p="5"
      color="white"
      bg="#0A1827"
      display="flex"
      flexDirection="column"
    >
      <Flex>
        <Image src="/assets/images/logo-mini.svg" alt="Docux Logo" mr={0} />
      </Flex>
    </Box>
  )
}

export default SidePanel
