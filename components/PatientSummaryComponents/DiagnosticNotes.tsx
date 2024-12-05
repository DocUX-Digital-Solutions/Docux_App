import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { UserContext } from '../../data/loadData';
import DiagnosticCodeIncluded from './DiagnosticCodeIncluded';

const DiagnosticNotes = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");
    const codes =[1,2,3,4]

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTextButton((prev) => (prev === "VIEW" ? "HIDE" : "VIEW"));
        setFontColor((prev) => (prev === "#000" ? "#346AAC" : "#000"));
    };

    const renderCodes = () => {
        return codes.map((code) => (
           <DiagnosticCodeIncluded/>
        ));
    };

    return (
        <View style={styles.container}>
        <View
    style={[
        styles.innerBox,
        isDropdownVisible && { backgroundColor: '#FFFDF0' },
    ]}
>
    <View style={styles.header}>
        <Text style={[styles.headerText, { color: fontColor }]}>
            DIAGNOSTIC CODES: 2
        </Text>
        <TouchableOpacity style={styles.viewButton} onPress={toggleDropdown}>
            <Text style={styles.viewButtonText}>{textButton}</Text>
        </TouchableOpacity>
    </View>
    {isDropdownVisible && (
        <Animated.View style={styles.dropdown}>
            <Text style={styles.dropdownItem}>Patient Info</Text>
            <Text style={styles.dropdownItem}>Appointments</Text>
            <Text style={styles.dropdownItem}>Medical History</Text>
            {renderCodes()}
        </Animated.View>
    )}
</View>

    </View>
    );
};

const styles = StyleSheet.create({
    container:{
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%'
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
        backgroundColor:'transparent'
    },
    dropdownItem: {
        fontSize: 16,
        paddingVertical: 5,
        color: '#333',
    },
});

export default DiagnosticNotes;
