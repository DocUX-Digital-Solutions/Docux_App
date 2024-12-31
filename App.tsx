import React, {useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import VisitPage from './screens/VisitScreen';
import PostVisitPage from './screens/PostVisitScreen';
import ResetPassword from './screens/ForgotPassword';
import { UserProvider } from './data/loadData';
const Stack = createStackNavigator();
import config from './amplifyconfiguration.json'
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { Auth} from 'aws-amplify';
Amplify.configure(config)
API.configure(config)
function App() {
  const navigationRef = React.createRef();
  useEffect(() => {
    const checkRememberedDevice = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        //const isDeviceRemembered = await Auth.deviceRemembered(currentUser);
        const isDeviceRemembered = await Auth.fetchDevices();
        if (isDeviceRemembered) {
          console.log('Device is remembered. Redirecting to Home...');
          navigationRef.current?.navigate('Home');
        }
      } catch (error) {
        console.log('Device is not remembered or no authenticated user:', error);
      }
    };

    //checkRememberedDevice();
  }, []);
  
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
            <Stack.Screen name="ResetPassword" component={ResetPassword}/>
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