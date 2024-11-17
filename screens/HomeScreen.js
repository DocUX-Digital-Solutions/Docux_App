import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SideMenu from '../components/HomeScreenCoponents/SideMenu';
import MainBox from '../components/HomeScreenCoponents/MainBox';
import * as ScreenOrientation from 'expo-screen-orientation';

function HomeScreen({ navigation }) {
  const [isSideMenuVisible, setSideMenuVisible] = useState(true);

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    lockOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.sideMenuContainer, { width: isSideMenuVisible ? '20%' : "6%" }]}>
        <SideMenu setSideMenuVisible={setSideMenuVisible} isSideMenuVisible={isSideMenuVisible} />
      </View>
      <View style={[styles.mainBoxContainer, { width: isSideMenuVisible ? '80%' : '90%' }]}>
        <MainBox navigation={navigation}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f7",
    flexDirection: 'row',
    height: '100%',
  },
  sideMenuContainer: {
    transition: 'width 0.3s ease-in-out', // Smooth transition for width change
  },
  mainBoxContainer: {
    flex: 1,
    transition: 'width 0.3s ease-in-out', // Smooth transition for width change
  },
});

export default HomeScreen;
