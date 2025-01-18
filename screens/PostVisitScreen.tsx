import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import SideMenu from '../components/SharedComponents/SideMenu';
import MainPostVisitComponentsBox from '../components/PatientSummaryComponents/MainPostVisitComponentsBox';
import {
  S3Client,
  CreateBucketCommand,
  DeleteBucketCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Auth, API, Storage } from 'aws-amplify';
const PostVisitPage = ({ route }) => {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const { navigation, patientItem } = route.params;

  // Animated values for width and opacity
  const sideMenuWidth = useState(new Animated.Value(0))[0];
  const mainBoxOpacity = useState(new Animated.Value(1))[0];
  const uploadFile = async () => {
    try {
      const response = await Storage.put('test.txt', 'Hello world!', {
        level: 'public', // Change to 'private' or 'protected' if necessary
      });
      console.log('File uploaded successfully to path:', response.key);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const fetchTranscript = async () => {
    /*
    try {
      const s3Client = new S3Client({
        region: 'us-east-1', // Your region
        credentials: {
          accessKeyId: , // Use your access keys securely
          secretAccessKey: ,
        },
      });

      // Get the S3 object
      const params = {
        Bucket: 'docux-demo-clinical-document-bucket', // Replace with your actual bucket name
        Key: "Elbow1/clinical_transcript.json",
      };
      console.log(params);

      const command = new GetObjectCommand(params);
      const response = await s3Client.send(command);
      console.log(response);

      // Convert the S3 response stream to text using transformToString
      const bodyContents = await response.Body.transformToString();
      const data = JSON.parse(bodyContents);
      console.log(data)
      //setTranscriptData(data);
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }
      */
  };
  const streamToString = (stream) => {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => {
        chunks.push(chunk);
      });

      stream.on('end', () => {
        const bodyContents = Buffer.concat(chunks).toString();
        resolve(bodyContents);
      });

      stream.on('error', (error) => {
        reject(error);
      });
    });
  };
const fetchJSONFile = async () => {
  try {
    //uploadFile()

    fetchTranscript()
    // List all files in the 'Elbow1' directory
    try {
      const result = await Storage.list('');
      console.log('Objects in S3:', result);
    } catch (error) {
      console.error('Error listing objects:', error);
    }
  
    const fileList = await Storage.list('', { level: 'public' });

    console.log('Files in Elbow1:', fileList);

    // Find the specific file 'summary.json'
    const file = fileList.find(file => file.key === 'Elbow1/summary.json');
    if (file) {
      const result = await Storage.get(file.key, { level: 'public' });

      console.log('File URL:', result);
      const response = await fetch(result);
      const textContent = await response.text();
      console.log('File content:', textContent);
    } else {
      console.error('summary.json not found in Elbow1');
    }
  } catch (error) {
    console.error('Error fetching JSON file:', error);
  }
};

  useEffect(() => {
    // Trigger animations when `isSideMenuVisible` changes
    fetchJSONFile()
    if (isSideMenuVisible) {
      Animated.timing(sideMenuWidth, {
        toValue: 95, // 95% width for side menu
        duration: 300,
        useNativeDriver: false, // Use native driver for non-layout animations
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
     
        <MainPostVisitComponentsBox
          setSideMenuVisible={setSideMenuVisible}
          patientItem={patientItem}
          navigation={navigation}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    marginTop:"20%",
  },
  sideMenuContainer: {
  },
  mainBoxContainer: {
    flex: 1,
    backgroundColor: '#fff', // Optional background for visibility
  },
});

export default PostVisitPage;
