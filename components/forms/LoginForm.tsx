import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../src/hooks/useAuth';
import { loginFormRules } from '../../src/validations/loginFormRules';

interface LoginFormProps {
  username: string;
  password: string;
  newPassword?: string;
  mfaCode?: string;
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
export const LoginForm: React.FC = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [totpSetupUri, setTotpSetupUri] = useState<string | null>(null);

  const { login, signInOutput, handleNextStep } = useAuth();

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    setLoginError(null)
    console.log(data)
      if (true) {
        console.log(2)
        await handleNextStep(signInOutput.nextStep, data)
        navigation.navigate('/home')
      } else {
        const result = await login(data.username, data.password)
        handleSignInNextSteps(result)
      }
    
  }

  useEffect(() => {
    if (signInOutput?.challengeName === 'MFA_SETUP') {
      // Handle TOTP setup
      const totpSetupUri = `otpauth://totp/DocuX:${signInOutput.username}?secret=${signInOutput.totpSecret}&issuer=DocuX`;
      setTotpSetupUri(totpSetupUri);
      // Open your modal here to show the TOTP setup
    }
    if (signInOutput?.isSignedIn) {
      // Close your modal here
      navigation.navigate('Home');
    }
  }, [signInOutput]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formControl}>
        <Text style={styles.label}>Username</Text>
        <Controller
          control={control}
          name="username"
          rules={loginFormRules.username}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
      </View>

      <View style={styles.formControl}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordInputGroup}>
          <Controller
            control={control}
            name="password"
            rules={loginFormRules.password}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <TouchableOpacity onPress={handleTogglePasswordVisibility}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>

      {signInOutput?.challengeName === 'SOFTWARE_TOKEN_MFA' && (
        <View style={styles.formControl}>
          <Text style={styles.label}>MFA Code</Text>
          <Controller
            control={control}
            name="mfaCode"
            rules={loginFormRules.mfaCode}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your MFA code"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.mfaCode && <Text style={styles.error}>{errors.mfaCode.message}</Text>}
        </View>
      )}

      {loginError && <Text style={styles.error}>{loginError}</Text>}

      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
        <Button title="SSO" onPress={() => {}} disabled={isSubmitting} />
      </View>

      {/* Implement your TOTP setup modal here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formControl: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  passwordInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LoginForm;
