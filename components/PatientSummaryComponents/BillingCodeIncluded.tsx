import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const BillingCodeIncluded = ({ codeInfo, onRemove }) => {
    return (
        <View style={styles.container}>
            <View style={styles.descriptionTextBox}>
                <Text style={styles.codeText}>{codeInfo.codeNumber}</Text>
                <Text style={styles.descriptionText}>{codeInfo.description}</Text>
            </View>
            <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        width: '100%',
        
    },
    descriptionTextBox: {
        flex: 1, // Allows the text to occupy the remaining space
        justifyContent: 'flex-start',
    },
    codeText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
    },
    descriptionText: {
        fontSize: 12, // Larger size for the description text
        color: '#333',
    },
    removeButton: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    removeButtonText: {
        color: '#346AAC', // White text color
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default BillingCodeIncluded;
