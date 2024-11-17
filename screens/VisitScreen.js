import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SideMenuPatient from '../components/VisitPageComponents/SideMenuPatient';
import MainBoxPatientVisit from '../components/VisitPageComponents/MainBoxPatientVisit';
import * as ScreenOrientation from 'expo-screen-orientation';

const VisitPage = ({ route }) => {
  console.log(route)
  const { timeAppointment, namePatient, symptoms, navigation } = route.params;
  
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
      <View style={[styles.sideMenuContainer, { width:  "10%" }]}>
        <SideMenuPatient setSideMenuVisible={setSideMenuVisible} isSideMenuVisible={isSideMenuVisible} />
      </View>
      <View style={[styles.mainBoxContainer, { width: isSideMenuVisible ? '80%' : '90%' }]}>
        <MainBoxPatientVisit navigation={navigation} namePatient={namePatient} symptoms={symptoms} timeAppointment={timeAppointment}/>
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
