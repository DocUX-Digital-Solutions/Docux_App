import React, { useState, useEffect } from 'react';
import { Keyboard, TextInput,TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SOAPBox = ({ patientItem, soapNotesInput }) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");
    const [dataDict, setDataDict] = useState(null);
    const [soapNotes, setSoapNotes] = useState(soapNotesInput);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTextButton((prev) => (prev === "VIEW" ? "HIDE" : "VIEW"));
        setFontColor((prev) => (prev === "#000" ? "#346AAC" : "#000"));
        
    };
    useEffect(() => {

    const proccessNotes = () =>{
        console.log(soapNotes)


    }
    proccessNotes()

},[]);
useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
          setIsKeyboardVisible(true);
        });
    
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
          setIsKeyboardVisible(false);
        });
    
        // Cleanup the listeners on component unmount
        return () => {
          keyboardDidHideListener.remove();
          keyboardDidShowListener.remove();
        };
      }, []);
const formatString = (input) =>{
    // Remove 'diagnosticTestingText' from the string
    const cleanedInput = input.replace('Text', '');
  
    // Split by camel case using a regular expression
    const words = cleanedInput.split(/(?=[A-Z])/);
  
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
  
    // Join the words back into a single string
    const formattedString = capitalizedWords.join(' ');
  
    return formattedString;
  }

  const handleTextChange = (key, newValue) => {
    setSoapNotes((prevNotes) => ({
      ...prevNotes,
      [key]: newValue,
    }));
  };

    const renderSoapNotes = () => {
    try {
      return Object.entries(soapNotes).map(([key, value]) => (
        <View key={key} style={styles.noteContainer}>
          <Text style={styles.boldText}>{formatString(key)}:</Text>
          {isKeyboardVisible ? (
          <TextInput
            style={styles.normalText}
            value={value}
            onChangeText={(newValue) => handleTextChange(key, newValue)}
            multiline={true}  
            textAlignVertical="top"  // Ensures text starts at the top of the input
            scrollEnabled={false}  
            
          />):(
            <TouchableOpacity onPress={() => setIsKeyboardVisible(true)}>
            <Text style={styles.normalTextNoBorder}>{value}</Text>
            </TouchableOpacity>
          )}
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
    
    },
    noteContainer: {
        marginBottom: 12,
        padding: 1,
        borderRadius: 8,
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    normalText: {
        fontSize: 16,
        color: '#333',
        borderWidth:1,
        borderRadius:2,
        padding:5,
        flexWrap: 'wrap', 
    },
    normalTextNoBorder:{
        fontSize: 16,
        color: '#333',
        padding:5,
        flexWrap: 'wrap', 
    },
    errorText: {
        fontSize: 14,
        color: 'red',
    },
});

export default SOAPBox;
