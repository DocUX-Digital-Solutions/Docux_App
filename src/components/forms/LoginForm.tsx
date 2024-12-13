import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignInOutput } from 'aws-amplify/auth'
import { loginFormRules } from '../../validations/loginFormRules'
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Flex,
  styled,
  InputRightElement,
  IconButton,
  InputGroup,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import TOTPSetupModal from '../login/TOTPSetupModal'
import { useAuth } from '../../hooks/useAuth'

interface LoginFormProps {
  username: string
  password: string
  newPassword?: string
  mfaCode?: string
}

const StyledLoginInput = styled(Input, {
  baseStyle: {
    color: 'white',
    border: 'none',
    borderBottom: '2px solid white',
    borderRadius: '0',
    backgroundColor: 'transparent',
    _focus: {
      borderBottom: '2px solid blue',
      outline: 'none',
    },
  },
})

const StyledLoginButton = styled(Button, {
  baseStyle: {
    marginTop: '4',
    borderRadius: '20',
  },
})

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [totpSetupUri, setTotpSetupUri] = useState<string | null>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const { login, signInOutput, handleNextStep } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormProps>()

  const onSubmit: SubmitHandler<LoginFormProps> = async data => {
    setLoginError(null)
    try {
      if (signInOutput) {
        await handleNextStep(signInOutput.nextStep, data)
        navigate('/home')
      } else {
        const result = await login(data.username, data.password)
        handleSignInNextSteps(result)
      }
    } catch (error) {
      setLoginError('Invalid username/password')
    }
  }

  const handleSignInNextSteps = async (output: SignInOutput) => {
    if (output.isSignedIn) {
      navigate('/home')
    } else {
      if (output.nextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP') {
        setTotpSetupUri(
          output.nextStep.totpSetupDetails.getSetupUri('DocuX').toString(),
        )
        onOpen()
      }
    }
  }

  useEffect(() => {
    if (
      signInOutput?.nextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
    ) {
      setTotpSetupUri(
        signInOutput.nextStep.totpSetupDetails.getSetupUri('DocuX').toString(),
      )
      onOpen()
    }
    if (signInOutput?.isSignedIn === true) {
      onClose()
      navigate('/home')
    }
  }, [signInOutput])

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column">
        <FormControl isInvalid={!!errors.username}>
          <FormLabel color="white" htmlFor="login-username">
            Username
          </FormLabel>
          <StyledLoginInput
            id="login-username"
            placeholder="Enter your username"
            width="50vh"
            {...register('username', loginFormRules.username)}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.password}>
          <FormLabel htmlFor="login-password" color="white">
            Password
          </FormLabel>
          <InputGroup>
            <StyledLoginInput
              id="login-password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', loginFormRules.password)}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <IconEyeOff /> : <IconEye />}
                onClick={handleTogglePasswordVisibility}
                variant="ghost"
                colorScheme="whiteAlpha"
                _focus={{ outline: 'none', boxShadow: 'none' }}
                _focusVisible={{ outline: 'none', boxShadow: 'none' }}
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        {signInOutput?.nextStep.signInStep ===
          'CONFIRM_SIGN_IN_WITH_TOTP_CODE' && (
          <FormControl mt={4} isInvalid={!!errors.mfaCode}>
            <FormLabel htmlFor="mfa-code" color="white">
              MFA Code
            </FormLabel>
            <StyledLoginInput
              id="mfa-code"
              placeholder="Enter your MFA code"
              {...register('mfaCode', loginFormRules.mfaCode)}
            />
            <FormErrorMessage>
              {errors.mfaCode && errors.mfaCode.message}
            </FormErrorMessage>
          </FormControl>
        )}

        {signInOutput?.nextStep.signInStep ===
          'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED' && (
          <FormControl mt={4} isInvalid={!!errors.newPassword}>
            <FormLabel htmlFor="new-password" color="white">
              New Password
            </FormLabel>
            <StyledLoginInput
              id="new-password"
              placeholder="Enter your new password"
              type="password"
              {...register('newPassword', loginFormRules.newPassword)}
            />
            <FormErrorMessage>
              {errors.newPassword && errors.newPassword.message}
            </FormErrorMessage>
          </FormControl>
        )}

        {loginError && (
          <Text color="red.500" mt={2}>
            {loginError}
          </Text>
        )}

        <Flex gap="20px" mt={6}>
          <StyledLoginButton
            flex={1}
            isLoading={isSubmitting}
            type="submit"
            colorScheme="blue"
          >
            Login
          </StyledLoginButton>
          <StyledLoginButton flex={1} isLoading={isSubmitting} type="button">
            SSO
          </StyledLoginButton>
        </Flex>
      </Flex>

      {signInOutput?.nextStep.signInStep ===
        'CONTINUE_SIGN_IN_WITH_TOTP_SETUP' && (
        <TOTPSetupModal
          isOpen={isOpen}
          onClose={onClose}
          setupUri={totpSetupUri || ''}
        />
      )}
    </form>
  )
}

export default LoginForm
