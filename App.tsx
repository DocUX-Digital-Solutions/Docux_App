import React, { useEffect, useRef, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
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
import config from './amplifyconfiguration.json';
import { Amplify, Auth } from 'aws-amplify';
import {
  Predictions,
  AmazonAIPredictionsProvider
} from '@aws-amplify/predictions';

Predictions.addPluggable(new AmazonAIPredictionsProvider());
const Stack = createStackNavigator();
Amplify.configure(config);

function App() {
  const navigationRef = useRef(null);
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        setInitialRoute('Home');
      } catch (error) {
        setInitialRoute('Login');
      } finally {
        setAuthChecked(true); // Signal that authentication check is complete
      }
    };

    checkAuth();
  }, []);

  if (!isAuthChecked) {
    // Show a loading indicator while checking authentication
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#F5F5F7' }, // Set your desired background color here
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="VisitPage" component={VisitPage} />
            <Stack.Screen name="PostVisitPage" component={PostVisitPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
