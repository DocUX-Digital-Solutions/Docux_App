import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SOAPBox = ({ patientItem }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTextButton((prev) => (prev === "VIEW" ? "HIDE" : "VIEW"));
        setFontColor((prev) => (prev === "#000" ? "#346AAC" : "#000"));
        
    };

    const renderSoapNotes = () => {
        try {
            return Object.entries(patientItem.soapNotes).map(([key, value]) => (
                <View key={key} style={styles.noteContainer}>
                    <Text style={styles.boldText}>{key}:</Text>
                    <Text style={styles.normalText}>{value}</Text>
                </View>
            ));
        } catch (error) {
            return <Text style={styles.errorText}>Unable to load notes</Text>;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerBox}>
                <View style={styles.header}>
                    <Text style={[styles.headerText,{color:fontColor}]}>SOAP</Text>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={toggleDropdown}
                        accessibilityLabel="Toggle SOAP notes visibility"
                        accessible={true}
                    >
                        <Text style={styles.viewButtonText}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
                {isDropdownVisible && (
                    <Animated.View style={styles.dropdown}>
                        <ScrollView>
                        {renderSoapNotes()}
                        </ScrollView>
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
        width: '100%',
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
        color: '#000',
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
        maxHeight:400
    },
    noteContainer: {
        marginBottom: 12,
        padding: 1,
        borderRadius: 8,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    normalText: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 14,
        color: 'red',
    },
});

export default SOAPBox;
