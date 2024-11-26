import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your screens
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import VisitPage from './screens/VisitScreen';
import PatientCard from './components/HomeScreenCoponents/PatientCard';
import { UserProvider } from './data/loadData';

const Stack = createStackNavigator();

function App() {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#f5f5f7' }, // Set your desired background color here
          }}>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="VisitPage" component={VisitPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </UserProvider>
  );
}

export default App;
