import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SideMenu from '../components/HomeScreenCoponents/SideMenu';
import MainBox from '../components/HomeScreenCoponents/MainBox';
import * as ScreenOrientation from 'expo-screen-orientation';
import MainBoxPatientVisit from '../components/VisitPageComponents/MainBoxPatientVisit';

const VisitPage = ({ route }) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const { timeAppointment, namePatient, symptoms, navigation } = route.params;


  return (
    <View style={styles.container}>
      <View style={[styles.sideMenuContainer, { width: isSideMenuVisible ? '95%' : "0%" }]}>
        <SideMenu setSideMenuVisible={setSideMenuVisible} isSideMenuVisible={isSideMenuVisible} />
      </View>
      <View style={[styles.mainBoxContainer, { opacity: isSideMenuVisible ? 0 : 1 }]}>
      <MainBoxPatientVisit navigation={navigation} namePatient={namePatient} symptoms={symptoms} timeAppointment={timeAppointment} setSideMenuVisible={setSideMenuVisible}/>
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

export default VisitPage;
