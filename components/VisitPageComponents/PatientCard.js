import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';

const PatientCard = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Patient Card</Text>
                <TouchableOpacity style={styles.viewButton} onPress={toggleDropdown}>
                    <Text style={styles.viewButtonText}>VIEW</Text>
                </TouchableOpacity>
            </View>
            {isDropdownVisible && (
                <Animated.View style={styles.dropdown}>
                    <Text style={styles.dropdownItem}>Patient Info</Text>
                    <Text style={styles.dropdownItem}>Appointments</Text>
                    <Text style={styles.dropdownItem}>Medical History</Text>
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
        fontWeight: 'bold',
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
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    dropdownItem: {
        fontSize: 16,
        paddingVertical: 5,
        color: '#333',
    },
});

export default PatientCard;
