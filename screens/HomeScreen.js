import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SideMenu from '../components/HomeScreenCoponents/SideMenu';
import MainBox from '../components/HomeScreenCoponents/MainBox';
import * as ScreenOrientation from 'expo-screen-orientation';

function HomeScreen({ navigation }) {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.sideMenuContainer, { width: isSideMenuVisible ? '95%' : "0%" }]}>
        <SideMenu setSideMenuVisible={setSideMenuVisible} isSideMenuVisible={isSideMenuVisible} />
      </View>
      <View style={[styles.mainBoxContainer, { opacity: isSideMenuVisible ? 0 : 1 }]}>
        <MainBox navigation={navigation} setSideMenuVisible={setSideMenuVisible}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
