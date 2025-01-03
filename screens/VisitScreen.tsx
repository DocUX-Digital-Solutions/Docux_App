import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SideMenu from '../components/SharedComponents/SideMenu';
import MainBoxPatientVisit from '../components/VisitPageComponents/MainBoxPatientVisit';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';

const VisitPage = ({ route }) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const { patientItem, navigation } = route.params;
  console.log(patientItem)
  const fetchData = async () => {
    const apiName = 'DataApi';
    const path = `/appointments/${patientItem.appointmentId}`;
    const sessionData = await Auth.currentAuthenticatedUser()
    const myInit = {
      headers: {
        Authorization: `Bearer ${sessionData.signInUserSession.accessToken.jwtToken}`
      }
    };

    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        console.log(response)
      })
      .catch((error) => {
      });
  }

  useEffect(() => {
      const fetchAndGroupAppointments = async () => {
        try {
          await fetchData();
        } catch (error) {
          console.error("Error fetching and grouping appointments:", error);
        }
      };
  
      fetchAndGroupAppointments();
      //setReloadKey((prev) => prev + 1);
    }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.sideMenuContainer, { width: isSideMenuVisible ? '95%' : "0%" }]}>
        <SideMenu setSideMenuVisible={setSideMenuVisible} isSideMenuVisible={isSideMenuVisible} />
      </View>
      <View style={[styles.mainBoxContainer, { opacity: isSideMenuVisible ? 0 : 1 }]}>
      <MainBoxPatientVisit navigation={navigation} patientItem={patientItem} setSideMenuVisible={setSideMenuVisible}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    
    marginTop:"20%"
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
