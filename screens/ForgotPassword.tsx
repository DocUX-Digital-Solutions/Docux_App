import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform,View, ActivityIndicator, ImageBackground, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';

const ResetPassword = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecond, setPasswordSecond] = useState('');
    const [errorText, setErrorText] = useState('');
    const [step, setStep] = useState('mfa'); // 'signIn' or 'mfa'
    const [mfaCode, setMfaCode] = useState("");
    const [loading, setLoading] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState(false);
  const handleFocus = () => {
    setScrollEnabled(true);
  };
  const handleForget = () => {
    setScrollEnabled(false);
  };


    const clickFunction = () => {
        if (step == "mfa") {
            forgotPasswordSubmit()

        } else {
            forgotPassword();


        }
    }

    async function forgotPassword() {
        try {
            const data = await Auth.forgotPassword(email);
            setStep("mfa");
            setErrorText("");
        } catch (err) {
            setErrorText("User Not Found");
        }
    }

    async function forgotPasswordSubmit() {
        if (passwordSecond != password) {
            setErrorText("Passwords Must Match");
            return
        }
        try {
            const data = await Auth.forgotPasswordSubmit(email, mfaCode, password);
            navigation.replace("Home");
        } catch (err) {
            setErrorText("Reset Failed");
        }
    }



    return (
            <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }}
                scrollEnabled={scrollEnabled}
                >
            <View style={styles.logoContainer}>
                <ImageBackground
                    style={styles.logoStyle}
                    source={require('../assets/logo.png')}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.descriptionText}>Forgot Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    returnKeyType="done"
                    onFocus={handleFocus} 
                    onBlur={handleForget}
                />
                <View>
                {step == "mfa" ? (
  <View>
    <Text style={styles.descriptionText}>Enter Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your password"
      placeholderTextColor="#aaa"
      value={password}
      onChangeText={setPassword}
      secureTextEntry={true}
      returnKeyType="done"
    />

    <Text style={styles.descriptionText}>Re-Enter Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Re-Enter your password"
      placeholderTextColor="#aaa"
      value={passwordSecond}
      onChangeText={setPasswordSecond}
      secureTextEntry={true}
      returnKeyType="done"
    />

    <Text style={styles.descriptionText}>Enter Recovery Code</Text>
    <TextInput
      style={styles.input}
      placeholder="MFA Code"
      placeholderTextColor="#aaa"
      value={mfaCode}
      onChangeText={setMfaCode}
      keyboardType="numeric"
      returnKeyType="done"
    />
  </View>
) : null}
                </View>
                {errorText && <Text style={styles.text}>{errorText}</Text>}
                <View style={styles.buttonsContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#3876BA" />
                    ) : (
                        <TouchableOpacity style={styles.loginButtonStyle} onPress={clickFunction}>
                            <Text style={styles.buttonText}>Reset Password</Text>
                        </TouchableOpacity>
                    )}
                    
                </View>
            </View>
            </ScrollView>
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
        paddingBottom: 10,
        paddingTop: 5
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

export default ResetPassword;
