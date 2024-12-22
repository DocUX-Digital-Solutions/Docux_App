// App.js
import { Amplify } from 'aws-amplify';
import awsConfig from './src/aws-exports';

Amplify.configure(awsConfig);

import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from './src/LoginScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoginScreen />
    </SafeAreaView>
  );
}



/*
import React from "react";
import { Button, View, StyleSheet, SafeAreaView } from "react-native";

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import awsconfig from './src/aws-exports.js';  

Amplify.configure({
  ...awsconfig,
  logging: { level: 'DEBUG' }
});
Amplify.configure(awsconfig);
const SignOutButton = () => {
  const { signOut } = useAuthenticator();

  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <SafeAreaView>
          <SignOutButton />
        </SafeAreaView>
      </Authenticator>
    </Authenticator.Provider>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    alignSelf: "flex-end",
  },
});

export default App;
/*import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
// Import your screens
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import VisitPage from './screens/VisitScreen';
import PostVisitPage from './screens/PostVisitScreen';
import { UserProvider } from './data/loadData';
import { PatchAppointmentRequest } from './src/hooks/useFetchAppointmentData';
import { useForm, FormProvider } from 'react-hook-form';
import { AuthProvider } from './src/contexts/AuthProvider';
const Stack = createStackNavigator();
import config from './amplifyconfiguration.json'
import {withAuthenticator} from 'aws-amplify-react-native'

import {Amplify} from 'aws-amplify';
Amplify.configure(config)
function App() {
  return (
    <AuthProvider>
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#F5F5F7' }, // Set your desired background color here
          }}>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="VisitPage" component={VisitPage}/>
            <Stack.Screen name="PostVisitPage" component={PostVisitPage}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
    </AuthProvider>
  );
}

export default App;*/
