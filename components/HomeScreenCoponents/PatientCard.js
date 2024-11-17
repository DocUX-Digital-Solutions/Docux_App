import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientCard = ({ timeAppointment, namePatient, statusPatent, symptoms, navigation }) => {
    const [lateOnTimeTextColor, setLateOnTimeTextColor] = useState('red');
    const [opacityValue, setOpacityValue] = useState(1);
    const [appointmentTime, setAppointmentTime] = useState(null)

    useEffect(() => {
        const currentTime = new Date();
        const date = new Date(timeAppointment);

        


        // Extracting the components
        let hours = date.getHours();
        const minutes = date.getMinutes();

        // Determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        setAppointmentTime(`${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`);
    }, [timeAppointment]);

    
    useEffect(() => {
        if(statusPatent =="ER"){
            setOpacityValue(1);
            setLateOnTimeTextColor("red");

        }else if(statusPatent =="Late"){
            setOpacityValue(1);
            setLateOnTimeTextColor("#ff974e");

        }else{
            setOpacityValue(0);
        }

    }, [statusPatent]);

    return (
        <View style={styles.container}>
            <View style={styles.rowOneTop}>
                <View style={styles.timeArive}>
                    <View style={styles.timeAriveTextBox}>
                        <Text style={[styles.timeAriveText, { color: lateOnTimeTextColor, opacity: opacityValue }]}>{statusPatent}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.topdotsMenu}>
                    <Icon name="dots-horizontal" size={25} color="#d8dce4" />
                </TouchableOpacity>
            </View>
            <View style={styles.nameTimeStyle}>
                <Text style={styles.nameText}>{namePatient}</Text>
                <Text style={styles.timeText}>{appointmentTime}</Text>
            </View>
            <View style={styles.symptomesStyleBox}>
                <Text style={styles.nameText}>{symptoms}</Text>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity
    style={styles.startButton}
    onPress={() => navigation.navigate('VisitPage', { timeAppointment:appointmentTime, namePatient:namePatient, symptoms:symptoms, navigation:navigation})}
>
                    <Text style={styles.startButtonText}>Start</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notesButton}>
                    <Text style={styles.notesButtonText}>Notes</Text>
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
        alignItems: 'center',
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
        color: 'red',
        fontWeight: 'bold'
    },
    topdotsMenu: {
        position: 'absolute',
        right: "4%",
    },
    nameText: {
        fontSize: 18,
        fontWeight: '500'
    },
    timeText: {
        fontSize: 18,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: '25%',
        position: 'absolute',
        bottom: 10,
        paddingHorizontal: '5%',
    },
    startButton: {
        backgroundColor: '#3875ba',
        height: '90%',
        borderRadius: 25,
        width: '45%',
        justifyContent: 'center',
    },
    startButtonText: {
        color: 'white',
        fontSize: 16,
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
