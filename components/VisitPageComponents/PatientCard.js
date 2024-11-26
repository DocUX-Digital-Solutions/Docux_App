import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Patient Card</Text>
            <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>VIEW</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '90%', // Adjusted width to fit within the screen
        height: 50,
        justifyContent: 'space-between', // Adjusted to space out items
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10, // Added padding to align content properly
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#000",
    },
    viewButton: {
        // No need for alignSelf here
    },
    viewButtonText: {
        color: '#346AAC',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PatientCard;