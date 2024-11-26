import React, { useContext, useRef, useState } from 'react';
import { View, FlatList, StyleSheet, Animated, Text, ScrollView } from 'react-native';
import PatientBox from '../HomeScreenCoponents/PatientBox';
import PatientInfoBox from './PatientInfoBox';
import PatientTranscript from './PatientTranscript';
import RecordingButtons from './RecordingButtons';
import TopMenu from '../HomeScreenCoponents/TopMenuBar';
import TopMenuPatient from './TopMenuPatient';

const MainBoxPatientVisit = ({ timeAppointment, namePatient, symptoms, navigation,setSideMenuVisible }) => {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [listHeight, setListHeight] = useState(0);
    const [contentHeight, setContentHeight] = useState(1);
    const [searchValue, setSearchValue] = useState(null);

    const indicatorHeight = listHeight * (listHeight / contentHeight) *1.5;


    return (
        <View style={styles.container}>
                        <View style={styles.topBar}>
                <TopMenuPatient appointmentsNumber={20} useExpand={true} setSideMenuVisible={setSideMenuVisible} setFilterValue={setSearchValue} />
            </View>
            <ScrollView>
            <View style={styles.patientContent}>
            </View>
            </ScrollView>
            <View style={styles.bottomBar}>
                <RecordingButtons appointmentsNumber={20} useExpand={false} navigation={navigation}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f7",
        flex: 1,
    },
    bottomBar: {
        height: 100,
        marginTop: '2%',
        marginBottom:"2%",
        paddingBottom:3,
    },
    listContentContainer: {
        paddingBottom: 20,
    },
    patientContent:{
        flexDirection:'row',
        height:"100%",
        width:"100%"
    },
    flatListContent: {
        width: '100%',
        height: '100%',
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
});

export default MainBoxPatientVisit;
