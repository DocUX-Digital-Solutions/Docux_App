import { useToast, UseToastOptions } from '@chakra-ui/react'

const useDocuXtoast = () => {
  const toast = useToast()

  const showToast = (options: UseToastOptions) => {
    toast({
      position: 'top',
      duration: 5000,
      isClosable: true,
      ...options,
    })
  }

  return showToast
}

export default useDocuXtoast
