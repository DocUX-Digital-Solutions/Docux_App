import React, { useState } from 'react';
import { ActivityIndicator, Text, ImageBackground, View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing the icon library
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [step, setStep] = useState('signIn'); // 'signIn' or 'mfa'
  const [isLoginWrong, setIsLoginWrong] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userVal,SetUserVal] = useState(null);
  const [buttonStateText,setButtonStateText] = useState("LOGIN");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const clickFunction = () =>{
    setLoading(true);
    setRefreshKey((prevKey) => prevKey + 1);
    if(step === 'mfa'){
      handleMFACode()

    }else{
      console.log(300)
      
      handleSignIn()
    }
  }
  
  
  
  // Call this function after the user is logged in
  
  
  async function setupTOTPAuth() {
    // To set up TOTP, first you need to get a `authorization code` from Amazon Cognito.
    // `user` is the current Authenticated user:
    //const secretCode = await Auth.setupTOTP(userVal);
    //console.log(secretCode)
    // You can directly display the `code` to the user or convert it to a QR code to be scanned.
    // For example, use following code sample to render a QR code with `qrcode.react` component:
    //      import QRCodeCanvas from 'qrcode.react';
    //      const str = "otpauth://totp/AWSCognito:"+ username + "?secret=" + secretCode + "&issuer=" + issuer;
    //      <QRCodeCanvas value={str}/>
  
    // ...
  
    // Then you will have your TOTP account in your TOTP-generating app (like Google Authenticator)
    // use the generated one-time password to verify the setup.
    try {
      /*
      const cognitoUserSession: CognitoUserSession = await Auth.verifyTotpToken(
        userVal,
        mfaCode
      );
      */
      // Don't forget to set TOTP as the preferred MFA method.
      
      await Auth.setPreferredMFA(userVal, 'TOTP');
      console.log(3000)
    } catch (error) {
      // Token is not verified
    }
  
    // ...
  
    // Finally, when sign-in with MFA is enabled, use the `confirmSignIn` API
    // to pass the TOTP code and MFA type.
    //const OTPCode = '123456'; // Code retrieved from authenticator app.
     // Optional, MFA Type e.g. SMS_MFA || SOFTWARE_TOKEN_MFA
     try {
      await Auth.confirmSignIn(userVal, mfaCode, 'SOFTWARE_TOKEN_MFA');
      console.log(500); // Logs 500 if the confirmation is successful
      navigation.navigate("Home");
      //await fetchUserData();
    } catch (error) {
      console.error('Error confirming MFA:', error); // Logs the error if it fails
    }
  }

  const handleSignIn = async () => {
    if (!email.length) {
      setIsLoginWrong(true);
      setLoading(false);
      setErrorMessage('Username cannot be empty');
      return;
    } else if(!password.length){
      setIsLoginWrong(true);
      setLoading(false);
      setErrorMessage('Password cannot be empty');
      return;
    } 
    try {
      console.log("hello")
      const user = await Auth.signIn(email, password);
      console.log(user.getUsername());
      SetUserVal(user);
      if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        setStep('mfa'); // Change step to 'mfa' to prompt for MFA code
        setButtonStateText("Verify")
        
      } else {
        console.log('User signed in:', user);
        // Navigate to the next screen (e.g., home screen)
      }
    } catch (error) {
      console.error('Error signing in:',  error.message);
      if (error.message.includes('User does not exist')) {
        setIsLoginWrong(true);
        setErrorMessage('No user found');
      }
      else {
        setIsLoginWrong(true);
        setErrorMessage('An error occurred. Please try again.');
      }
    }
    setLoading(false);
  };

  const handleMFACode = async () => {
    try {
      //await Auth.confirmSignIn(userVal, OTPCode, mfaType);
      await setupTOTPAuth();
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
      <View style={styles.inputContainer}>
      {isLoginWrong && <Text style={styles.text}>{errorMessage}</Text>}
      </View>
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
        </View>
      )}

      <View style={styles.buttonsContainer}>
      {loading ? (
    <ActivityIndicator size="large" color="#3876BA" />
  ) : (
    <TouchableOpacity style={styles.loginButtonStyle} onPress={clickFunction}>
      <Text style={styles.buttonText}>{buttonStateText}</Text>
    </TouchableOpacity>
  )}
        <TouchableOpacity style={styles.SSOButtonStyle}>
          <Text style={styles.buttonText}>SSO</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonForgot} onPress={()=> navigation.navigate("ResetPassword")}>
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
    fontSize: 16,
    color: 'red',
    paddingBottom:10,
    paddingTop:5
  },
  logoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '25%',
    paddingBottom: 75,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 20,
    
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
    marginTop: 20,
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
