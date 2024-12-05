import React, { useContext, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Animated, Text, ScrollView } from 'react-native';
import TopMenuPatient from '../SharedComponents/TopMenuPatient';
import PatientCard from './PatientCard';
import SOAPBox from './SOAPBox';
import TranscriptBox from './TranscriptBox';
import OperativeNotes from './OperativeNotes';
import DiagnosticNotes from './DiagnosticNotes';
import BillingCodes from './BillingCodes';
import BottomButtons from './BottomButtons';

const MainPostVisitComponentsBox = ({setSideMenuVisible,patientItem, navigation }) => {
    const [searchValue, setSearchValue] = useState(null);

    function navGoHome(){
        navigation.navigate("Home")
    }

    return (
        <View style={styles.container}>
                <TopMenuPatient setSideMenuVisible={setSideMenuVisible} setFilterValue={setSearchValue} />
<ScrollView>
                <PatientCard/>
                <SOAPBox patientItem={patientItem}/>
                <TranscriptBox/>
                <OperativeNotes/>
                <DiagnosticNotes/>
                <BillingCodes numCodes={30}/>
                
                </ScrollView>
                <BottomButtons navGoHome={navGoHome}/>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxCard: {
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '55%',
    },
    listContentContainer: {
        paddingBottom: 20,
    },
    patientContent: {
        flexDirection: 'row',
        height: "100%",
        width: "100%",
    },
    flatListContent: {
        width: '100%',
        height: '100%',
    },
    oscilloscopeBox: {
        height: 70,
    },
    scrollBarContainer: {
        position: 'absolute',
        right: 6,
        top: '15%', // Adjust this value to position the scrollbar correctly
        width: 5,
        height: '80%', // Make the grey scrollbar take up 80% of the screen height
        backgroundColor: '#c3c3c3',
        borderRadius: 5,
    },
    scrollIndicator: {
        width: '100%',
        backgroundColor: '#194a81',
        borderRadius: 5,
    },
    confirmEndBox:{
        position:'absolute',
        height:'100%',
        width:'100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignContent:'center',
        justifyContent:'center'
    },
    bottomBar: {
        position: 'absolute', // Make the bottom bar fixed
        bottom: 0, // Align it to the bottom of the screen
        width: '100%', // Stretch it across the full width of the screen
        paddingVertical: 30, // Add vertical padding for spacing
        alignItems: 'flex-end', // Center content horizontally
    },
    
});


export default MainPostVisitComponentsBox;
