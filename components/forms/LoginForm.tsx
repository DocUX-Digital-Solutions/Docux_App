import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../src/hooks/useAuth';
import { loginFormRules } from '../../src/validations/loginFormRules';

interface LoginFormProps {
  username: string;
  password: string;
  newPassword?: string;
  mfaCode?: string;
}

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [totpSetupUri, setTotpSetupUri] = useState<string | null>(null);

  const navigation = useNavigation();
  const { login, signInOutput, handleNextStep } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormProps>();

  const onSubmit: SubmitHandler<LoginFormProps> = async (data) => {
    console.log(22)
    setLoginError(null);

    try {
      if (signInOutput) {
        console.log(22)
        await handleNextStep(signInOutput.nextStep, data);
        navigation.navigate('Home');
      } else {
        console.log(login)
        const result = await login(data.username, data.password);
        console.log(22)
        handleSignInNextSteps(result);
      }
    } catch (error) {
      console.log(error)
      setLoginError('Invalid username/password');
    }
  };

  const handleSignInNextSteps = async (output: any) => {
    if (output.isSignedIn) {
      navigation.navigate('Home');
    } else if (output.nextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP') {
      setTotpSetupUri(output.nextStep.totpSetupDetails.getSetupUri('DocuX').toString());
    }
  };

  useEffect(() => {
    if (
      signInOutput?.nextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'
    ) {
      setTotpSetupUri(
        signInOutput.nextStep.totpSetupDetails.getSetupUri('DocuX').toString()
      );
    }
    if (signInOutput?.isSignedIn) {
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
          <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={showPassword ? 'eye-slash' : 'eye'} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>

      {loginError && <Text style={styles.error}>{loginError}</Text>}

      <View style={styles.buttonGroup}>
        <Button title="Login" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
        <Button title="SSO" onPress={() => {}} disabled={isSubmitting} />
      </View>

      {totpSetupUri && (
        <View>
          <Text>Scan this QR code for TOTP setup:</Text>
          <Text>{totpSetupUri}</Text>
        </View>
      )}
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
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  passwordInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LoginForm;
