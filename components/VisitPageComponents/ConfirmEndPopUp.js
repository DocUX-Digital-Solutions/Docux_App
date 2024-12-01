import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const ConfirmEnd = ({ continueRecording, endVisit }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsOver(false);
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.textbox}>
                    <View style={styles.headerText}>
                        <Text style={styles.headerTextContent}>Recording will be paused</Text>
                    </View>
                    <View style={styles.bodyText}>
                        <Text style={styles.bodyTextContent}>Going back to main dashboard will pause the recording</Text>
                    </View>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.endButton} onPress={() => endVisit()}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stayButton} onPress={() => continueRecording()}>
                        <Text style={styles.stayButtonText}>Stay with patient</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        backgroundColor: '#fff',
        width: '90%',
        height: 170,
        borderRadius: 20,
        justifyContent: 'space-between', // Ensures proper spacing between text and buttons
        paddingVertical: 20, // Space inside the container
    },
    textbox: {
        alignItems: 'flex-start', // Align text to the left
        justifyContent: 'flex-start', // Position text at the top
        paddingHorizontal: 15, // Add space from left edge
    },
    headerText: {
        marginBottom: 10, // Space between header and body text
    },
    headerTextContent: {
        fontSize: 18,
        fontWeight: '700',
        color: '#000',
    },
    bodyText: {},
    bodyTextContent: {
        fontSize: 14,
        color: '#565656',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Align buttons to the left
        paddingHorizontal: 10, // Add spacing from left edge
    },
    stayButton: {
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 25,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '3%',
        flexDirection: 'row',
        borderColor: '#565656',
        borderWidth: 1,
    },
    endButton: {
        backgroundColor: '#3876BA',
        height: 40,
        borderRadius: 25,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '1%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    stayButtonText: {
        textAlign: 'center',
        color: '#565656',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ConfirmEnd;
