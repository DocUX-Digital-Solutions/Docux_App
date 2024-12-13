import { Flex, Center, useBreakpointValue, Image } from '@chakra-ui/react'
import LoginForm from '../components/forms/LoginForm'

const Login: React.FC = () => {
  const displayLeft = useBreakpointValue({ base: 'none', md: 'flex' })

  return (
    <Flex
      height="100vh"
      width="100vw"
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Center
        flex={{ md: 1 }}
        display={displayLeft}
        bgImage={`url(/assets/images/login-background.png)`}
      />
      <Center flex={1} bgColor="#0A1827" minH="100vh" flexDirection="column">
        <Image
          src={'/assets/images/logo_white.svg'}
          alt="Docux Logo"
          height="400px"
        />
        <LoginForm />
      </Center>
    </Flex>
  )
}

export default Login
