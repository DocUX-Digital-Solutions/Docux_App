import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SideMenu from '../components/SharedComponents/SideMenu';
import MainBox from '../components/HomeScreenComponents/MainBox';
import * as ScreenOrientation from 'expo-screen-orientation';

function HomeScreen({ navigation }) {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);

  // Animated values for width and opacity
  const sideMenuWidth = useState(new Animated.Value(0))[0];
  const mainBoxOpacity = useState(new Animated.Value(1))[0];

  useEffect(() => {
    // Trigger animations when `isSideMenuVisible` changes
    if (isSideMenuVisible) {
      Animated.timing(sideMenuWidth, {
        toValue: 95, // 95% width for side menu
        duration: 300,
        useNativeDriver: false, // Native driver not supported for width changes
      }).start();

      Animated.timing(mainBoxOpacity, {
        toValue: 0, // Hide main box
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(sideMenuWidth, {
        toValue: 0, // 0% width for side menu
        duration: 300,
        useNativeDriver: false,
      }).start();

      Animated.timing(mainBoxOpacity, {
        toValue: 1, // Show main box
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSideMenuVisible, sideMenuWidth, mainBoxOpacity]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.sideMenuContainer,
          {
            width: sideMenuWidth.interpolate({
              inputRange: [0, 95],
              outputRange: ['0%', '95%'],
            }),
          },
        ]}
      >
        <SideMenu
          setSideMenuVisible={setSideMenuVisible}
          isSideMenuVisible={isSideMenuVisible}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.mainBoxContainer,
          { opacity: mainBoxOpacity },
        ]}
      >
        <MainBox
          navigation={navigation}
          setSideMenuVisible={setSideMenuVisible}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '100%',
  },
  sideMenuContainer: {
    backgroundColor: '#f8f8f8', // Optional background for visibility
  },
  mainBoxContainer: {
    flex: 1,
    backgroundColor: '#fff', // Optional background for visibility
  },
});

export default HomeScreen;
