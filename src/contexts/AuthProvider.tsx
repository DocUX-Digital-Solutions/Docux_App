import React, { createContext, useState, useEffect } from 'react'
import {
  signIn,
  signOut,
  getCurrentUser,
  confirmSignIn,
  SignInOutput,
  AuthUser,
  setUpTOTP,
} from 'aws-amplify/auth'

interface LoginFormProps {
  username: string
  password: string
  newPassword?: string
  mfaCode?: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: AuthUser | null
  signInOutput: SignInOutput | null
  login: (username: string, password: string) => Promise<SignInOutput>
  logout: () => Promise<void>
  handleNextStep: (
    nextStep: SignInOutput['nextStep'],
    data: LoginFormProps,
  ) => Promise<void>
  setUpTOTP: () => Promise<string>
  confirmTOTP: (totpCode: string) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [signInOutput, setSignInOutput] = useState<SignInOutput | null>(null)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    setIsLoading(true)
    try {
      const currentUser = await getCurrentUser()
      setIsAuthenticated(true)
      setUser(currentUser)
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (
    username: string,
    password: string,
  ): Promise<SignInOutput> => {
    console.log(111)
    const result = await signIn({ username, password })
    console.log(result)
    setSignInOutput(result)
    if (result.isSignedIn) {
      setIsAuthenticated(true)
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    return result
  }

  const logout = async () => {
    try {
      await signOut()
      setIsAuthenticated(false)
      setUser(null)
      setSignInOutput(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleNextStep = async (
    nextStep: SignInOutput['nextStep'],
    data: LoginFormProps,
  ) => {
    switch (nextStep.signInStep) {
      case 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED': {
        const result = await confirmSignIn({
          challengeResponse: data.newPassword || '',
        })
        setSignInOutput(result)
        return
      }
      case 'CONFIRM_SIGN_IN_WITH_TOTP_CODE':
      case 'CONFIRM_SIGN_IN_WITH_SMS_CODE':
        await confirmSignIn({ challengeResponse: data.mfaCode || '' })
        break
      case 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP': {
        setSignInOutput({
          isSignedIn: false,
          nextStep: nextStep,
        })
        return
      }
      case 'DONE':
        break
      default:
        throw new Error(`Unsupported next step: ${nextStep.signInStep}`)
    }

    setSignInOutput(null)
    setIsAuthenticated(true)
    const currentUser = await getCurrentUser()
    setUser(currentUser)
  }

  const confirmTOTP = async (totpCode: string) => {
    const result = await confirmSignIn({ challengeResponse: totpCode })
    setSignInOutput(result)
    if (result.isSignedIn) {
      setIsAuthenticated(true)
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
  }

  const setupTOTP = async (): Promise<string> => {
    const totpSetupDetails = await setUpTOTP()
    const appName = 'DocuX'
    return totpSetupDetails.getSetupUri(appName).toString()
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signInOutput,
    login,
    logout,
    handleNextStep,
    setUpTOTP: setupTOTP,
    confirmTOTP,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
