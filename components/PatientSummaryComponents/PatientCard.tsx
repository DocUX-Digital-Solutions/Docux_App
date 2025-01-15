import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';

const PatientCard = ({ patientName, reasonVisit, scheduledAt }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTextButton((prev) => (prev === "VIEW" ? "HIDE" : "VIEW"));
        setFontColor((prev) => (prev === "#000" ? "#346AAC" : "#000"));
    };

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      };
      const date = new Date(scheduledAt);


    return (
        <View style={styles.container}>
            <View style={styles.innerBox}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, { color: fontColor }]}>Patient Card</Text>
                    <TouchableOpacity style={styles.viewButton} onPress={toggleDropdown}>
                        <Text style={styles.viewButtonText}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                {isDropdownVisible && (
                    <Animated.View style={styles.dropdown}>

                        
                            <Text style={styles.dropdownItemHeader}>Patient Name: </Text>
                            <Text style={styles.dropdownItemData}>{patientName}</Text>
                        
                            <Text style={styles.dropdownItemHeader}>Visit Reason: </Text>
                            <Text style={styles.dropdownItemData}>{reasonVisit}</Text>
                        
                            <Text style={styles.dropdownItemHeader}>Appointment Time: </Text>
                            <Text style={styles.dropdownItemData}>{date.toLocaleDateString('en-US', options)}</Text>
                        
                    </Animated.View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    innerBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
        color: "#000",
    },
    viewButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    viewButtonText: {
        color: '#346AAC',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdown: {
        marginTop: 10,
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    dropdownItemHeader: {
        fontSize: 18,
        paddingVertical: 5,
        color: '#333',
        fontWeight: 'bold',
        alignSelf:'center'
    },
    dropdownItemData: {
        fontSize: 18,
        paddingVertical: 5,
        color: '#333',
        alignSelf:'center',
        flexWrap: 'wrap', 
    },
    sectionBox: {
        flexDirection: 'row'
    }
});

export default PatientCard;
