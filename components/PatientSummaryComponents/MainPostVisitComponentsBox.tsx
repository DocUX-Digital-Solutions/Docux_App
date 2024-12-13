import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TopMenuPatient from '../SharedComponents/TopMenuPatient';
import PatientCard from './PatientCard';
import SOAPBox from './SOAPBox';
import TranscriptBox from './TranscriptBox';
import OperativeNotes from './OperativeNotes';
import BillingCodes from './BillingCodes';
import BottomButtons from './BottomButtons';
import DiagnosticCodeBox from './DiagnosticCodeBox';

const MainPostVisitComponentsBox = ({ setSideMenuVisible, patientItem, navigation }) => {
    const [searchValue, setSearchValue] = useState(null);
    const [isEditable, setIsEditable] = useState(false);


    function navGoHome() {
        navigation.navigate("Home");
    }
    const toggleEditMode = () => {
        setIsEditable(!isEditable);
    };

    return (
        <View style={styles.container}>
            <TopMenuPatient setSideMenuVisible={setSideMenuVisible} setFilterValue={setSearchValue} />
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={true}
            >
                <PatientCard />
                <SOAPBox patientItem={patientItem} />
                <TranscriptBox isEditable={isEditable} />
                <OperativeNotes />
                <DiagnosticCodeBox />
                <BillingCodes numCodes={30} />
            </ScrollView>
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
    },
    bottomButtons: {
        position: 'absolute', // Fix the BottomButtons at the bottom
        bottom: 0, // Align it to the bottom of the screen
        width: '100%', // Stretch it across the full width of the screen
        backgroundColor: '#ffffff', // Optional: Add a background color for visibility
        paddingVertical: 15, // Add padding for spacing inside the buttons container
        alignItems: 'center', // Center the buttons horizontally
        elevation: 5, // Optional: Add shadow on Android for better visibility
    
    },
});

export default MainPostVisitComponentsBox;
