import React, { createContext, useState, useEffect } from 'react';
import Auth  from 'aws-amplify';

interface LoginFormProps {
  username: string;
  password: string;
  newPassword?: string;
  mfaCode?: string;
}
import { signIn } from 'aws-amplify/auth';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null; // Adjusted type from AuthUser to any to be generic
  signInOutput: any | null; // Adjusted type from SignInOutput to any to be generic
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  handleNextStep: (
    nextStep: any, // Adjusted type from SignInOutput['nextStep'] to any to be generic
    data: LoginFormProps,
  ) => Promise<void>;
  setUpTOTP: () => Promise<string>;
  confirmTOTP: (totpCode: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any | null>(null);
  const [signInOutput, setSignInOutput] = useState<any | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    setIsLoading(true);
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
      setUser(currentUser);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<any> => {
    try {
      //console.log(200)
      const result = await signIn({ username, password });
      
      setSignInOutput(result);
      if (result.signInUserSession) {
        setIsAuthenticated(true);
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      }
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setSignInOutput(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNextStep = async (nextStep: any, data: LoginFormProps) => {
    try {
      switch (nextStep.challengeName) {
        case 'NEW_PASSWORD_REQUIRED': {
          const result = await Auth.completeNewPassword(user, data.newPassword || '');
          setSignInOutput(result);
          return;
        }
        case 'SOFTWARE_TOKEN_MFA':
        case 'SMS_MFA': {
          await Auth.confirmSignIn(user, data.mfaCode || '');
          break;
        }
        case 'MFA_SETUP': {
          setSignInOutput({
            isSignedIn: false,
            nextStep: nextStep,
          });
          return;
        }
        case 'DONE':
          break;
        default:
          throw new Error(`Unsupported next step: ${nextStep.challengeName}`);
      }

      setSignInOutput(null);
      setIsAuthenticated(true);
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error handling next step:', error);
      throw error;
    }
  };

  const confirmTOTP = async (totpCode: string) => {
    try {
      const result = await Auth.confirmSignIn(user, totpCode, 'SOFTWARE_TOKEN_MFA');
      setSignInOutput(result);
      if (result.signInUserSession) {
        setIsAuthenticated(true);
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Error confirming TOTP:', error);
      throw error;
    }
  };

  const setupTOTP = async (): Promise<string> => {
    try {
      const totpSetupDetails = await Auth.setupTOTP(user);
      const appName = 'DocuX';
      return `otpauth://totp/${appName}:${user.username}?secret=${totpSetupDetails}&issuer=${appName}`;
    } catch (error) {
      console.error('Error setting up TOTP:', error);
      throw error;
    }
  };

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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
