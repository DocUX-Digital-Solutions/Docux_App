import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState(''); // 'signIn' or 'mfa'
    const [mfaCode, setMfaCode] = useState("");


    const clickFunction = () => {
        if (step =="mfa") {
            forgotPasswordSubmit()

        } else {
            forgotPassword();
            

        }
    }

    async function forgotPassword() {
        try {
            const data = await Auth.forgotPassword(email);
            console.log(data);
            setStep("mfa");
            console.log(step)
        } catch (err) {
            console.log(err);
        }
    }

    async function forgotPasswordSubmit()
    {
        try {
            const data = await Auth.forgotPasswordSubmit(email, mfaCode, password);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#aaa"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
                  
                    <View style={styles.input}>
                      <Text style={styles.title}>Enter Recovery Code</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="MFA Code"
                        placeholderTextColor="#aaa"
                        value={mfaCode}
                        onChangeText={setMfaCode}
                        keyboardType="numeric"
                      />
                    </View>
            <View style={styles.buttonContainer}>
                <Button title="Reset Password" onPress={forgotPasswordSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
    },
});

export default ResetPassword;
