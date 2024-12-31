import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SideMenu from '../components/HomeScreenComponents/SideMenu';
import MainBox from '../components/HomeScreenComponents/MainBox';
import { UserContext } from '../data/loadData';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import Config from 'react-native-config';
import axios from 'axios';

import { PatchAppointmentRequest } from '../src/hooks/useFetchAppointmentData'
function HomeScreen({ navigation }) {
  const poolId = Config.VITE_REACT_APP_USER_POOL_ID;
  const apiUrl = Config.VITE_API_URL;
  const { jsonData } = useContext(UserContext);
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const [selectedSideMenu, setSelectedSideMenu] = useState(1);
  const [dataItems, setDataItems] = useState(jsonData);
  const [patientsNumber, setPatientsNumber] = useState(0);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const apiClient = axios.create({
    baseURL: Config.VITE_API_URL,
    headers: {
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Requested-With',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    },
  })
  console.log(apiClient)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userVal = await Auth.currentAuthenticatedUser()
        const apiData = await API.get('DataApi', '/', {
          headers: { Authorization: `Bearer ${userVal.signInUserSession.idToken.jwtToken}` }, // Include the JWT token for auth
        });
        //setData(apiData);
        console.log('Fetched data:', apiData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log(500505050)
      const apiName = 'DataApi';
      const path = '/items';
      const myInit = {
        headers: {}, // OPTIONAL
        response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
 
      };

      API.get(apiName, path, myInit)
        .then((response) => {
          // Add your code here
          console.log('fetching data:',response)
          console.log(JSON.stringify(response, null, 2));
        })
        .catch((error) => {
          console.log('not fetching data:',error);
        });
    }
    
    fetchData();
    function head() {
      const apiName = 'DataApi';
      const path = '/docux.v1.medical.HealthService';
      const myInit = {
        headers: {} // OPTIONAL
      };
    
      return API.head(apiName, path, myInit);
    }

    (async function () {

      try{
        const responser = await head();
        console.log(3)
      console.log(responser)
      }catch(error){
        console.log(error)
      }
    })();
  }, []);


  // Animated values for width and opacity
  const sideMenuWidth = useState(new Animated.Value(0))[0];
  const mainBoxOpacity = useState(new Animated.Value(1))[0];

  const setSelectedSideMenuFunction = (item) => {
    setSelectedSideMenu(item)
    getCurrentData()

  }

  const fetchRestData = async () => {
    try {
      const response = await API.get('yourApiName', '/path', {
        headers: { /* optional headers */ }
      });
      console.log('REST API Response:', response);
    } catch (error) {
      console.error('REST API Error:', error);
    }
  };

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

      if (appointment.appointmentState.appointmentStateName == "In Progress") {
        //console.log(appointment)
      }
      if (!categorizedAppointments[appointment.appointmentState.appointmentStateName]) {
        categorizedAppointments[appointment.appointmentState.appointmentStateName] = []
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
    else {
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
          lengthInReview={categorizedAppointments["In Review"] ? categorizedAppointments["In Review"].length : 0}

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
          patientsNumber={dataItems.length}
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
