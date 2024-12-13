import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import LoginForm from '../components/forms/LoginForm';

const { height, width } = Dimensions.get('window');

export const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.flex, styles.imageContainer]}>
        {/*
        <Image
          source={require('../../assets/images/login-background.png')}
          style={styles.backgroundImage}
        />
        */}
      </View>
      <View style={[styles.flex, styles.loginContainer]}>
        {/*
        <Image
          source={require('../../assets/images/logo_white.svg')}
          style={styles.logo}
        />
        */}
        <LoginForm navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  flex: {
    flex: 1,
  },
  imageContainer: {
    display: 'none',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  loginContainer: {
    backgroundColor: '#0A1827',

  },
  logo: {
    height: 100,
    resizeMode: 'contain',
  },
});

export default Login;
