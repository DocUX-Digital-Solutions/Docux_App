import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PopUpInfoBox = ({contentTitle,contentData,isVisible,setIsVisible}) => {

    const handleRemove = () => {
        setIsVisible(false); // Hide the component
    };

    if (!isVisible) {
        return null; // Don't render the component if it's not visible
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.descriptionTextBox}>
                    <Text style={styles.codeText}>{contentTitle}</Text>
                    <Text style={styles.descriptionText}>{contentData}</Text>
                </View>
                <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
                    <Icon name='close' size={30} color="#346AAC" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute', // Ensure the box stays fixed in position
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional semi-transparent background
        justifyContent: 'center', // Center the box vertically
        alignItems: 'center', // Center the box horizontally
        zIndex: 1000, // Ensure it is above everything else
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 50,
        width: '90%', // Set a relative width for better responsiveness
        backgroundColor: '#FFF', // Box background color
        borderRadius: 10, // Rounded corners
        elevation: 5, // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.25, // Shadow opacity for iOS
        shadowRadius: 4, // Shadow radius for iOS
    },
    descriptionTextBox: {
        flex: 1, // Allows the text to occupy the remaining space
        justifyContent: 'flex-start',
        height:"100%"
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
        backgroundColor: 'transparent', // Light background color for the button
        position:'absolute',
        right:0,
        top:0
    },
    removeButtonText: {
        color: '#346AAC', // Text color
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default PopUpInfoBox;
