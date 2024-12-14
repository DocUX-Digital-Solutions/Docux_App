import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated, TextInput } from 'react-native';

const TranscriptBox = ({isEditable}) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");
    const [text, setText] = useState("This is editable text.");



    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTextButton((prev) => (prev === "VIEW" ? "HIDE" : "VIEW"));
        setFontColor((prev) => (prev === "#000" ? "#346AAC" : "#000"));
    };

    return (
        <View style={styles.container}>
        <View style={styles.innerBox}>
            <View style={styles.header}>
                <Text style={[styles.headerText,{color:fontColor}]}>TRANSCRIPT</Text>
                <TouchableOpacity style={styles.viewButton} onPress={toggleDropdown}>
                    <Text style={styles.viewButtonText}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            {isDropdownVisible && (
                <Animated.View style={styles.dropdown}>
                   <TextInput
        style={[styles.input, isEditable ? styles.editable : styles.readOnly]}
        value={text} // Display initial text
        onChangeText={setText} // Update state on text change
        multiline={true} // Allow multiple lines
        numberOfLines={6} // Sets initial height
        textAlignVertical="top" // Aligns text to the top
        editable={isEditable} // Controls whether the text is editable
        placeholder="Press the button to edit..."
      />
                    <Text style={styles.dropdownItem}>Pqatient Info</Text>
                    <Text style={styles.dropdownItem}>Appointments</Text>
                    <Text style={styles.dropdownItem}>Medical History</Text>
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
    },
    dropdownItem: {
        fontSize: 16,
        paddingVertical: 5,
        color: '#333',
    },
});

export default TranscriptBox;
