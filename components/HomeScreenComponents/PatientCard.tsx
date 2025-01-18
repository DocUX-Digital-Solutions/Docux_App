import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientCard = ({stateItems,item,navigation}) => {
    const [lateOnTimeTextColor, setLateOnTimeTextColor] = useState("#646464");
    const [opacityValue, setOpacityValue] = useState(1);
    const [appointmentTime, setAppointmentTime] = useState(null)
    const [statusPatent,setStatusPatent] = useState(item.status)
    const [navigateScreen,setNavigateScreen] = useState( stateItems ? "PostVisitPage" : "VisitPage")

    function formatTime(timeAppointment){
        const date = new Date(timeAppointment);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
    
    useEffect(() => {
        if(item.patientType =="new"){
            setOpacityValue(1);
            setLateOnTimeTextColor("#54A6FF");

        }else if(item.patientType =="existing"){
            setOpacityValue(1);
            setLateOnTimeTextColor("#D21919");

        }else{
            //setOpacityValue(0);
        }

    }, [item.patientType]);

    function capitalizeFirstLetter(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }

    return (
        <View style={styles.container}>
            <View style={styles.rowOneTop}>
                <View style={styles.timeArive}>
                    <View style={styles.timeAriveTextBox}>
                        <Text style={[styles.timeAriveText, { color: lateOnTimeTextColor }]}>{capitalizeFirstLetter(item.patientType)}</Text>
                    </View>
                </View>
                
            </View>
            <View style={styles.nameTimeStyle}>
                <Text style={styles.nameText}>{item.patientName}</Text>
                
            </View>
            <View style={styles.timeBox}>
                <Text style={styles.timeText}>{formatTime(item.scheduledAt)}</Text>
            </View>
            <View style={styles.symptomesStyleBox}>
                <Text style={styles.symptomsText}>{item.reason}</Text>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
    style={styles.startButton}
    onPress={() => navigation.navigate(navigateScreen, { patientItem:item, navigation:navigation})}
>
                    <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
            
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        width: '100%', // Adjusted width to fit within the screen
      
        height: 150, // Adjust this value to control the overall height
        
    },
    rowOneTop: {
        flexDirection: 'row',
        width: '100%',
        height: '15%',
        alignItems: 'flex-start',
        paddingTop:8,
        marginBottom:8
    },
    nameTimeStyle: {
        flexDirection: 'row',
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '4%',
    },
    symptomesStyleBox: {
        flexDirection: 'row',
        width: '100%',
        height: '15%',
        alignItems: 'center',
        paddingHorizontal: '4%',
    },
    timeArive: {
        flex: 1,
        alignItems: 'center',
    },
    timeAriveTextBox: {      
        position: 'absolute',
        left: "4%",
    },
    timeAriveText: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        fontWeight:'bold',
        fontSize:18,
    },
    topdotsMenu: {
        position: 'absolute',
        right: "4%",
    },
    nameText: {
        fontSize: 20,
        fontWeight: '600'
    },
    symptomsText:{
        fontSize: 18,
        fontWeight: '400',
        color:"#646464"
    },
    timeBox: {
        position: 'absolute', // Enables absolute positioning
        top: 10, // Adjust this value to control vertical position
        right: 10, // Adjust this value to control horizontal position
        backgroundColor: '#DFE2E6',
        borderRadius: 20,
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center', // Center aligns text inside the box
    },
    timeText: {
        fontSize: 18,
        fontWeight: '500',
    },
    buttonContainer: {
    
        width: '100%',
        height: '30%',
      
        top: 10,
        paddingHorizontal: '2%',
    },
    startButton: {
        backgroundColor: '#3876BA',
        height: '100%',
        borderRadius: 25,
        width: '50%',
        justifyContent: 'center',
    },
    startButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '700',
    },
    notesButton: {
        backgroundColor: 'white',
        height: '90%',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#3875ba',
        width: '45%',
        justifyContent: 'center',
    },
    notesButtonText: {
        color: '#3875ba',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
    },
});

export default PatientCard;
