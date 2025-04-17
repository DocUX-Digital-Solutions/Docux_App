import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, ScrollView, Keyboard,
  Text, KeyboardAvoidingView, TouchableOpacity, Dimensions
} from 'react-native';
import TopMenuPatient from '../SharedComponents/TopMenuPatient';
import PatientCard from './PatientCard';
import SOAPBox from './SOAPBox';
import TranscriptBox from './TranscriptBox';
import OperativeNotes from './OperativeNotes';
import BillingCodes from './BillingCodes';
import BottomButtons from './BottomButtons';
import DiagnosticCodeBox from './DiagnosticCodeBox';
import VeraHealthBox from './VeraHealthBox';
import PopUpInfoBox from './PopUpInfoBox';
import { Auth, API, Storage } from 'aws-amplify';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-get-random-values';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';

const MainPostVisitComponentsBox = ({ setSideMenuVisible, patientItem, navigation, searchterms=""}) => {
  const [searchValue, setSearchValue] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [dataValues, setDataValues] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [reloadKeyOne, setReloadKeyOne] = useState(5);
  const [reloadKeyTwo, setReloadKeyTwo] = useState(10);
  const [reloadKeyThree, setReloadKeyThree] = useState(12);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [editText, setEditText] = useState(false);
  const [transcriptData, setTranscriptData] = useState([]);
  const [isVisible,setIsVisible] = useState(false);
  const [popUpHeader,setPopUpHeader] = useState("");
  const [popUpData,setPopUpData] = useState("");
  const [allCodes,setAllCodes] = useState([]);

  
  const min = 1; // Minimum value
  const max = 100; // Maximum value
  const callAllCodes = async ()=>{
    await makeAuthenticatedPostRequest()
  }
  const makeAuthenticatedPostRequest = async () => {
    try {
      
      const response = await axios.get(
        'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search',
        {
          params: {
            terms: searchterms,
            sf: 'code,name',
            df: 'code,name',
          },
        },
      )
      const results = response.data[3] || []
      setAllCodes(results.map((item: [string, string]) => ({
        codeNumber: item[0],
        description: item[1],
      })))
      //return response.data;
    } catch (error) {
      console.error('Error making authenticated POST request:', error);
      throw error; // Handle the error appropriately
    }
  }
  const fetchTranscript = async (refrenceDoc) => {

    try {
      const s3Client = new S3Client({
        region: 'us-east-1', // Your region
        credentials: {
            accessKeyId:'ASIA46XTBM52ET5EWGPY',
            secretAccessKey:'C/p6M0jBCsuNVEt/M0H8uuzSN7iTRBrJkdXjHS1y'
        },
      });

      // Get the S3 object
      const params = {
        Bucket: 'docux-demo-clinical-document-bucket', // Replace with your actual bucket name
        Key: refrenceDoc,
      };
      //console.log(params);

      const command = new GetObjectCommand(params);
      const response = await s3Client.send(command);

      // Convert the S3 response stream to text using transformToString
      const bodyContents = await response.Body.transformToString();
      const data = JSON.parse(bodyContents);
      setTranscriptData(data);
      setReloadKeyThree((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching transcript:', error);
    }

  };

  useEffect(() => {
    makeAuthenticatedPostRequest()
    const getDataBox = async () => {
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
          setDataValues(response);
          setReloadKey((prev) => prev + 1);
          setReloadKeyOne((prev) => prev + 1);
          setReloadKeyTwo((prev) => prev + 1);
          console.log(response)
          fetchTranscript(response?.encounters?.transcriptionReference)
        })
        .catch((error) => {
        });
    }

    getDataBox();

  }, []);

  function navGoHome() {
    navigation.navigate("Home");
  }

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
    setEditText(!editText);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    });

    // Cleanup the listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleFloatingButtonPress = () => {
    setIsKeyboardVisible(false);
    Keyboard.dismiss()
    // Add custom functionality for the floating button here
  };


  return (
    <View style={styles.container}>
      {/*<TopMenuPatient setSideMenuVisible={setSideMenuVisible} setFilterValue={setSearchValue} />*/}
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true}
      >
        <PatientCard
          patientName={dataValues?.patientName}
          reasonVisit={dataValues?.reason}
          scheduledAt={dataValues?.scheduledAt}
        />
        <SOAPBox
          soapNotesInput={dataValues?.encounters?.soapNotes}
          key={reloadKey}
          editText={editText}

        />
        <TranscriptBox transcriptData={transcriptData}  key={reloadKeyThree}/>
        <VeraHealthBox />
        <OperativeNotes />

        <DiagnosticCodeBox
          diagnosticCodes={dataValues?.encounters?.diagnosticCodes}
          suggestedDiagnosticCodes={dataValues?.encounters?.suggestedDiagnosticCodes}
          key={reloadKeyOne}
          setPopUpHeader={setPopUpHeader}
          setPopUpData={setPopUpData}
          setIsVisible={setIsVisible}
          allCodes ={allCodes}
        />

        <BillingCodes
          numCodes={30}
          billingCodes={dataValues?.encounters?.billingCodes}
          suggestedBillingCodes={dataValues?.encounters?.suggestedBillingCodes}
          key={reloadKeyTwo}


        />
        <PopUpInfoBox
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        contentData={popUpData}
        contentTitle={popUpHeader}
        />
      </ScrollView>
      {isKeyboardVisible && (
        <TouchableOpacity
          style={[styles.floatingButton, { bottom: keyboardHeight + 20 }]}
          onPress={handleFloatingButtonPress}
        >
          <Icon
            name="close"
            size={30}
            color="#fff"

          />
        </TouchableOpacity>
      )}
      <View style={styles.bottomButtons}>
        <BottomButtons
          navGoHome={navGoHome}
          toggleEditMode={toggleEditMode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the entire screen
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100, // Add enough padding to avoid overlap with the fixed BottomButtons
    paddingTop: "20%"

  },
  bottomButtons: {
    position: 'absolute', // Fix the BottomButtons at the bottom
    bottom: 0, // Align it to the bottom of the screen
    width: '100%', // Stretch it across the full width of the screen
    paddingVertical: 15, // Add padding for spacing inside the buttons container
    alignItems: 'center', // Center the buttons horizontally
    elevation: 5, // Optional: Add shadow on Android for better visibility

  },
  floatingButton: {
    position: 'absolute',

    left: 10,
    backgroundColor: '#007aff',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default MainPostVisitComponentsBox;
