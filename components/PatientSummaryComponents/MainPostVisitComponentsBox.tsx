import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView,  Keyboard,
    Text, KeyboardAvoidingView, TouchableOpacity, Dimensions } from 'react-native';
import TopMenuPatient from '../SharedComponents/TopMenuPatient';
import PatientCard from './PatientCard';
import SOAPBox from './SOAPBox';
import TranscriptBox from './TranscriptBox';
import OperativeNotes from './OperativeNotes';
import BillingCodes from './BillingCodes';
import BottomButtons from './BottomButtons';
import DiagnosticCodeBox from './DiagnosticCodeBox';
import VeraHealthBox from './VeraHealthBox';
import { Auth, API, Storage } from 'aws-amplify';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainPostVisitComponentsBox = ({ setSideMenuVisible, patientItem, navigation }) => {
    const [searchValue, setSearchValue] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [dataValues, setDataValues] = useState(null);
    const [reloadKey,setReloadKey] = useState(0);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

     useEffect(() => {
        const getDataBox = async () =>{
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
                    console.log(response?.encounters?.billingCodes)
                    console.log(JSON.stringify(response, null, 2));
                    setReloadKey((prev) => prev + 1);
                  })
                  .catch((error) => {
                  });
        }
      
            getDataBox();
          //setReloadKey((prev) => prev + 1);
        }, []);

    function navGoHome() {
        navigation.navigate("Home");
    }
    const toggleEditMode = () => {
        setIsEditable(!isEditable);
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
        console.log('Floating button pressed!');
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
                    key ={reloadKey}
                />
                <TranscriptBox isEditable={isEditable} />
                <VeraHealthBox/>
                <OperativeNotes />
                <DiagnosticCodeBox 
                diagnosticCodes={dataValues?.encounters?.diagnosticCodes}
                suggestedDiagnosticCodes={dataValues?.encounters?.suggestedDiagnosticCodes}
                key ={reloadKey}
                />
                <BillingCodes 
                numCodes={30} 
                billingCodes={dataValues?.encounters?.billingCodes}
                suggestedBillingCodes={dataValues?.encounters?.suggestedBillingCodes}
                key ={reloadKey}
                
                
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
                <BottomButtons navGoHome={navGoHome} toggleEditMode={toggleEditMode} />
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
        paddingTop:10
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
