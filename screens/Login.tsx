import React, { useState } from 'react';
import { Text, ImageBackground, View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing the icon library
import { Auth } from 'aws-amplify';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [step, setStep] = useState('signIn'); // 'signIn' or 'mfa'
  const [isLoginWrong, setIsLoginWrong] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(email, password);
      if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        setStep('mfa'); // Change step to 'mfa' to prompt for MFA code
      } else {
        console.log('User signed in:', user);
        // Navigate to the next screen (e.g., home screen)
      }
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.message === 'UserNotFoundException') {
        setIsLoginWrong(true);
        setErrorMessage('User not found. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  const handleMFACode = async () => {
    try {
      const user = await Auth.confirmSignIn(
        email, // Email or username
        mfaCode, // The MFA code from user input
        'SMS_MFA' // Or 'SOFTWARE_TOKEN_MFA' if using TOTP
      );
      console.log('MFA successful, user logged in:', user);
      // Proceed to the next step after MFA is confirmed
    } catch (error) {
      console.error('Error confirming MFA code:', error);
      setIsLoginWrong(true);
      setErrorMessage('Invalid MFA code. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 200 : 0}
    >
      <View style={styles.logoContainer}>
        <ImageBackground
          style={styles.logoStyle}
          source={require('../assets/logo.png')}
          resizeMode="contain"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.descriptionText}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.descriptionText}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
      </View>

      {isLoginWrong && <Text style={styles.text}>{errorMessage}</Text>}

      {/* MFA Step: Display MFA input when required */}
      {step === 'mfa' && (
        <View style={styles.inputContainer}>
          <Text style={styles.descriptionText}>Enter MFA Code</Text>
          <TextInput
            style={styles.input}
            placeholder="MFA Code"
            placeholderTextColor="#aaa"
            value={mfaCode}
            onChangeText={setMfaCode}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.loginButtonStyle} onPress={handleMFACode}>
            <Text style={styles.buttonText}>Submit MFA Code</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.loginButtonStyle} onPress={handleSignIn}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.SSOButtonStyle}>
          <Text style={styles.buttonText}>SSO</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonForgot}>
        <Text style={styles.buttonTextForgot}>forgot password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091827',
  },
  logoStyle: {
    width: 200,
    height: 100,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    height: 50,
    marginBottom: 15,
    fontSize: 16,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingRight: 10,
    color: "#fff",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: 'red',
  },
  logoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '25%', // Pushes the logo to about 1/4th down the screen
    paddingBottom: 75,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#091827',
  },
  input: {
    backgroundColor: 'transparent',
    height: 50,
    marginBottom: 30,
    paddingHorizontal: 0,
    fontSize: 16,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    color: "#fff",
  },
  descriptionText: {
    color: "#fff",
    paddingBottom: 3,
  },
  loginButtonStyle: {
    backgroundColor: '#3876BA',
    height: 50,
    borderRadius: 25,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: "3%",
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  SSOButtonStyle: {
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 25,
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: "1%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    alignSelf: 'center',
  },
  buttonTextForgot: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  buttonForgot: {
    marginTop: 100,
  },
});

export default LoginScreen;
