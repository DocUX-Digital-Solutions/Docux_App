import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SideMenu from '../components/SharedComponents/SideMenu';
import MainBoxPatientVisit from '../components/VisitPageComponents/MainBoxPatientVisit';
import { Auth, API } from 'aws-amplify';
import { TranscribeStreamingClient } from "@aws-sdk/client-transcribe-streaming";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const VisitPage = ({ route }) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const { patientItem, navigation } = route.params;
  const VITE_REACT_APP_IDENTITY_POOL_ID = "us-east-1:8ea5e5a7-33b8-40a2-908e-97791ed5d401";
  const VITE_REACT_APP_AWS_REGION = "us-east-1";
  const your_user_pool_id = "us-east-1_kFmUaGHD0"
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
        //console.log(response)
        //console.log(JSON.stringify(response, null, 2));
      })
      .catch((error) => {
      });
      
      const transcribeClient = new TranscribeStreamingClient({
        region: VITE_REACT_APP_AWS_REGION,
        credentials: fromCognitoIdentityPool({
          clientConfig: { region: VITE_REACT_APP_AWS_REGION },
          identityPoolId: VITE_REACT_APP_IDENTITY_POOL_ID,
          logins: {
            [`cognito-idp.${VITE_REACT_APP_AWS_REGION}.amazonaws.com/${your_user_pool_id}`]: sessionData.signInUserSession.accessToken.jwtToken,
          },
        }),
      });

      //console.log(transcribeClient)
  }
  
  const authenticateUser = () => {
    const poolData = {
      UserPoolId: your_user_pool_id, // Your user pool ID
      ClientId: '33m4rkeea9dmj9q3v2m1hmgsb0', // Your app client ID
    };
    const userPool = new CognitoUserPool(poolData);
    //console.log( userPool.getCurrentUser())
    /*
    const userData = { Username: username, Pool: userPool };
    const authenticationDetails = new AuthenticationDetails({ Username: username, Password: password });
  
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const idToken = result.getIdToken().getJwtToken();
        // Use the idToken as needed
      },
      onFailure: (err) => {
        console.error(err);
      },
    });
    */
  };
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
