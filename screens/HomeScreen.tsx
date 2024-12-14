import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SideMenu from '../components/HomeScreenComponents/SideMenu';
import MainBox from '../components/HomeScreenComponents/MainBox';
import * as ScreenOrientation from 'expo-screen-orientation';
import { UserContext } from '../data/loadData';
function HomeScreen({ navigation }) {
  const { jsonData } = useContext(UserContext);
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const [selectedSideMenu, setSelectedSideMenu] = useState(1);
  const [dataItems, setDataItems] = useState(jsonData);
  const [patientsNumber, setPatientsNumber] = useState(0);
  

  // Animated values for width and opacity
  const sideMenuWidth = useState(new Animated.Value(0))[0];
  const mainBoxOpacity = useState(new Animated.Value(1))[0];

  const setSelectedSideMenuFunction = (item) => {
    setSelectedSideMenu(item)
    getCurrentData()

  }

  const groupAppointmentsByDate = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    const categorizedAppointments = {
      today: [],
      tomorrow: [],
      future: [],
      past: [],

    };
  
    jsonData.forEach(appointment => {
      const appointmentDate = new Date(appointment.scheduledAt);
      const appointmentDateOnly = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
  
      if (appointmentDateOnly.getTime() === today.getTime()) {
        categorizedAppointments.today.push(appointment);
      } else if (appointmentDateOnly.getTime() === tomorrow.getTime()) {
        categorizedAppointments.tomorrow.push(appointment);
      } else if (appointmentDateOnly > tomorrow) {
        categorizedAppointments.future.push(appointment);
      } else if (appointmentDateOnly < today) {
        categorizedAppointments.past.push(appointment);
      }

      if(appointment.appointmentState.appointmentStateName =="In Progress"){
        console.log(appointment)
      }
      if (!categorizedAppointments[appointment.appointmentState.appointmentStateName]) {
        categorizedAppointments[appointment.appointmentState.appointmentStateName] =[]
      }
      categorizedAppointments[appointment.appointmentState.appointmentStateName].push(appointment)
    }); 
  
    return categorizedAppointments;
  };
  const categorizedAppointments = groupAppointmentsByDate();
  
  const getCurrentData = () => {
    // Today Value
    if (selectedSideMenu == 1) {
      setDataItems(categorizedAppointments.today);

    } else if (selectedSideMenu == 2) {
      setDataItems(categorizedAppointments.tomorrow);
    }
    else{
      setDataItems([])
    }
   
    
  };

  useEffect(() => {
    getCurrentData();
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
          selectedSideMenu={selectedSideMenu}
          setSelectedSideMenu={setSelectedSideMenuFunction}
          lengthToday={categorizedAppointments.today.length}
          lengthTomorrow={categorizedAppointments.tomorrow.length}
          lengthInReview={categorizedAppointments["In Progress"].length || ""}

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
          jsonData={dataItems}
          patientsNumber = {dataItems.length}
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
