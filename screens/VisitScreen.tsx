import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import SideMenu from '../components/SharedComponents/SideMenu';
import MainBoxPatientVisit from '../components/VisitPageComponents/MainBoxPatientVisit';
import { Auth, API, Storage } from 'aws-amplify';
import { TranscribeStreamingClient } from "@aws-sdk/client-transcribe-streaming";
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
//import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Buffer } from "buffer"; // Import Buffer for React Native
import { Button, Text, TextInput, } from "react-native";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const client = new S3Client({
  // The AWS Region where the Amazon Simple Storage Service (Amazon S3) bucket will be created. Replace this with your Region.
  region: "us-east-1",
  credentials: fromCognitoIdentityPool({
    // Replace the value of 'identityPoolId' with the ID of an Amazon Cognito identity pool in your Amazon Cognito Region.
    identityPoolId: "us-east-1:edbe2c04-7f5d-469b-85e5-98096bd75492",
    // Replace the value of 'region' with your Amazon Cognito Region.
    clientConfig: { region: "us-east-1" },
  }),
});

enum MessageType {
  SUCCESS = 0,
  FAILURE = 1,
  EMPTY = 2,
}
const VisitPage = ({ route }) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const { patientItem, navigation } = route.params;
  const VITE_REACT_APP_IDENTITY_POOL_ID = "us-east-1:8ea5e5a7-33b8-40a2-908e-97791ed5d401";
  const VITE_REACT_APP_AWS_REGION = "us-east-1";
  const your_user_pool_id = "us-east-1_kFmUaGHD0"
  // Adjust environment variables manually in React Native.
const REGION = "us-east-1"; // Example region
const IDENTITY_POOL_ID = "us-east-1:your-identity-pool-id";
const TRANSCRIPT_BUCKET = "docux-demo-clinical-document-bucket"; // Bucket name
const transcriptReference = "your-transcript-key"; // S3 key for the file

const fetchData1 = async () => {
  const sessionData = await Auth.currentAuthenticatedUser()

  const s3Client = new S3Client({
    region: VITE_REACT_APP_AWS_REGION,
    credentials: fromCognitoIdentityPool({
      clientConfig: { region: VITE_REACT_APP_AWS_REGION },
      identityPoolId: VITE_REACT_APP_IDENTITY_POOL_ID,
      logins: {
        "cognito-idp.us-east-1.amazonaws.com/us-east-1_ZRXeRemoP": sessionData.signInUserSession.accessToken.jwtToken, // Use the real token here
      },
    }),
  });
  const jsonFileKey = 'Elbow1/clinical_transcript.json';
  const params = {
    Bucket: TRANSCRIPT_BUCKET,
    Key: jsonFileKey,
  };
  
  try {
    const response1 = await fetch('https://docux-demo-clinical-document-bucket.s3.us-east-1.amazonaws.com/Elbow1/transcript.json');
    const blob = await response1.blob();
    //console.log(response1)
    // Convert the blob to a string or process it as needed
    //const text = await blob.text();
    //console.log('File content:', text);
    const command = new GetObjectCommand(params);
    //console.log(command)
    const response = await s3Client.send(command);
    //console.log(response)
    // Read the body from S3 (stream) and convert to string
    //const bodyContents = await streamToString(response.Body);
    
    // Parse the JSON data
    //const data = JSON.parse(bodyContents);
  } catch (error) {
    console.error("Error fetching data22:", error);
  }
};

async function getFileData() {
  try {
      // Get the URL from Storage with the original path
      const url = await Storage.get('Elbow1/summary.json', { expires: 3600 });  // Assuming the file path is inside 'public/'

      // Remove 'public/' from the URL (if necessary)
      const modifiedUrl = url.replace('/public', '');  // Adjust the URL
      console.log(modifiedUrl)
      // Fetch the data from the modified URL
      const response = await fetch(modifiedUrl);
      
      // Check if the response is ok (status code 200)
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response as JSON (or other formats as needed)
      const data = await response.json();
      
      console.log('Fetched Data:', data);  // Log the fetched data
      return data;  // Return the fetched data
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}
  const fetchData = async () => {
    fetchData1();
    getFileData()
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
        console.log(JSON.stringify(response, null, 2));
      })
      .catch((error) => {
      });
      getJSONFile();
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
      //console.log("??")
      console.log(transcribeClient)
  }
  const fetchJSONFile = async (jsonFileKey, sessionData) => {
    try {
      return
      // Ensure credentials are available
      //const credentials = await Auth.currentCredentials();
      //console.log('Credentials:', credentials);
      const result = await Storage.get('Elbow1/summary.json');
  
      console.log('File fetched successfully212:', result);
      const response = await fetch(result); // result should be a URL if it's a public file or signed URL
      console.log(response)
    // Read the response body as text
      const textContent = await response.text();
      console.log('File fetched successfully111:', textContent);
    } catch (error) {
      console.error('Error fetching JSON file:1', error);
    }
  };
  
  // Usage example:

  async function getJSONFile() {
    try {
  
      const jsonFileKey = 'Elbow1/clinical_transcript.json';
      fetchJSONFile(jsonFileKey, { identityId: 'us-east-1:8ea5e5a7-33b8-40a2-908e-97791ed5d401' });
      return
      // Replace 'Elbow1/clinical_transcript.json' with the path from the response
      //const jsonFileKey = 'Elbow1/clinical_transcript.json';
      const sessionData = await Auth.currentAuthenticatedUser()
      // Get the signed URL for the JSON file
      const fileList = await Storage.list('/');
      console.log(fileList)
      const result = await Storage.get(jsonFileKey, {
        level: 'protected',
        identityId: sessionData.signInUserSession.accessToken.jwtToken // the identityId of that user
      });
      const fileUrl = await Storage.get(jsonFileKey, { download: true });
      console.log(fileUrl)
      // Fetch the file content
      const response = await fileUrl.Body.text();
      const jsonData = JSON.parse(response);
     
      //global.Buffer = global.Buffer || Buffer;
      /*
      const s3Client = new S3Client({
  region: VITE_REACT_APP_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: {
      region: VITE_REACT_APP_AWS_REGION,
    },
    identityPoolId: VITE_REACT_APP_IDENTITY_POOL_ID,
    logins: {
      'cognito-idp.us-east-1.amazonaws.com/us-east-1_ZRXeRemoP': sessionData.signInUserSession.accessToken.jwtToken, // Adjust to your setup
    },
  }),
});
*/
    } catch (error) {
      console.error('Error fetching JSON file:', error);
    }
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
