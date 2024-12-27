import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import VisitPage from './screens/VisitScreen';
import PostVisitPage from './screens/PostVisitScreen';
import { UserProvider } from './data/loadData';
import { PatchAppointmentRequest } from './src/hooks/useFetchAppointmentData';
const Stack = createStackNavigator();
import config from './amplifyconfiguration.json'
import { Amplify } from 'aws-amplify'
Amplify.configure(config)
function App() {
  
  return (
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
  );
}

export default App;