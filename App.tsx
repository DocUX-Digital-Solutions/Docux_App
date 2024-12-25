import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Auth } from 'aws-amplify';
// Import your screens
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import VisitPage from './screens/VisitScreen';
import PostVisitPage from './screens/PostVisitScreen';
import { UserProvider } from './data/loadData';
const Stack = createStackNavigator();
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports'; // Adjust the path as necessary
Amplify.configure({
  ...awsconfig,
  Auth: {
    ...awsconfig.Auth,
    // Optional settings for MFA
    mandatorySignIn: false,
  },
});
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setUser(currentUser);
      } catch (error) {
        //console.log('Not signed in');
        setUser(null);
      }
    };

    checkAuth();
  }, []);
  
  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user ? 'Home' : 'Login'}
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
  );
}

export default App;