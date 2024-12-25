import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
type SetupTOTPAuthParameters = {
  user: string;
  challengeAnswer: string;
  mfaType?: 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA';
};

async function setupTOTPAuth({
  user,
  challengeAnswer,
  mfaType
}: SetupTOTPAuthParameters) {
  // To set up TOTP, first you need to get a `authorization code` from Amazon Cognito.
  // `user` is the current Authenticated user:
  const secretCode = await Auth.setupTOTP(user);

  // You can directly display the `code` to the user or convert it to a QR code to be scanned.
  // For example, use following code sample to render a QR code with `qrcode.react` component:
  //      import QRCodeCanvas from 'qrcode.react';
  //      const str = "otpauth://totp/AWSCognito:"+ username + "?secret=" + secretCode + "&issuer=" + issuer;
  //      <QRCodeCanvas value={str}/>

  // ...

  // Then you will have your TOTP account in your TOTP-generating app (like Google Authenticator)
  // use the generated one-time password to verify the setup.
  try {
    const cognitoUserSession: CognitoUserSession = await Auth.verifyTotpToken(
      user,
      challengeAnswer
    );
    // Don't forget to set TOTP as the preferred MFA method.
    await Auth.setPreferredMFA(user, 'TOTP');
  } catch (error) {
    // Token is not verified
  }

  // ...

  // Finally, when sign-in with MFA is enabled, use the `confirmSignIn` API
  // to pass the TOTP code and MFA type.
  const OTPCode = '123456'; // Code retrieved from authenticator app.
  await Auth.confirmSignIn(user, OTPCode, mfaType); // Optional, MFA Type e.g. SMS_MFA || SOFTWARE_TOKEN_MFA
}
const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);
  const [user, setUser] = useState(null);

  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(email, password);
      console.log('User signed in:', user);
  
      // Check if MFA is required
      if (user.challengeName === 'SMS_MFA' || user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        setMfaRequired(true);
        setUser(user);
      } else {
        // Confirm session
        const session = await Auth.currentSession();
        console.log('Session:', session);
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };
  
  const verifyTOTP = async () => {
    try {
      console.log(user);
      await Auth.verifyTotpToken(user, verificationCode);
  
      // Set TOTP as preferred MFA method
      await Auth.setPreferredMFA(user, 'TOTP');
      console.log('TOTP setup successful');
  
      // Confirm session
      const session = await Auth.currentSession();
      console.log('Session after TOTP setup:', session);
  
      navigation.replace('Home');
    } catch (error) {
      console.error('Error verifying TOTP code:', error.message);
    }
  };
  
  
  const handleVerifyCode = async () => {
    try {
      console.log(user);
      const confirmedUser = await Auth.confirmSignIn(user, verificationCode);
      console.log('MFA Successful:', confirmedUser);
  
      // Confirm session
      const session = await Auth.currentSession();
      console.log('Session:', session);
  
      navigation.replace('Home'); // Navigate to Home screen
    } catch (error) {
      console.error('Error verifying code:', error.message);
    }
  };
  

  return (
    <View style={styles.container}>
      {!mfaRequired ? (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Sign In" onPress={handleSignIn} />
        </>
      ) : (
        <>
          <Text>Enter the verification code sent to your device:</Text>
          <TextInput
            placeholder="Verification Code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="numeric"
            style={styles.textIn}
          />
          <Button title="Verify Code" onPress={verifyTOTP} />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: "100%",

    alignSelf: 'center',
    paddingBottom: 60,
    paddingTop: 10,
    alignContent:'center',


    justifyContent: 'center',

  },
  textIn:{
    paddingBottom:150
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visitInProgressText: {
    color: '#969696',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8, // Space between icon and text
  },
  recordingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  editIcon: {
    right: "7%"
  },
  editButtonStyle: {
    backgroundColor: '#42526D',
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
  submitButtonStyle: {
    backgroundColor: '#346AAC',
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
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Login;
