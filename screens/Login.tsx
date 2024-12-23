import React from 'react';
import { View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import LoginForm from '../components/forms/LoginForm';

const Login = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768; // Mimics the `base` and `md` breakpoints in Chakra UI

  return (
    <View style={styles.container}>
      {!isSmallScreen && (
        <View style={styles.backgroundContainer}>
        </View>
      )}
      <View style={styles.loginContainer}>
        <LoginForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
  },
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#0A1827',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 150,
    marginBottom: 20,
  },
});

export default Login;

