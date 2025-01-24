import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet, View, Animated, TextInput } from 'react-native';
const TranscriptBox = ({transcriptData}) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [textButton, setTextButton] = useState("VIEW");
    const [fontColor, setFontColor] = useState("#000");
    const [currentSpeaker, setCurrentSpeaker] = useState("");
    const [dataTranscript,setDataTranscript] = useState(transcriptData?.TranscriptSegments);
    


    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        setTextButton((prev) => (prev === "VIEW" ? "HIDE" : "VIEW"));
        setFontColor((prev) => (prev === "#000" ? "#346AAC" : "#000"));
    };
    const renderCodesSuggestedSearch = () => {
        var transcriptData = combineContent(dataTranscript);
        //console.log(transcriptData)
        return transcriptData.length > 0 ? (
            transcriptData.map((item) => (
                <View style={styles.itemContainer} key={item?.SegmentId}>
                <Text style={styles.contentText}>{increaseName(item?.ParticipantDetails?.ParticipantRole)}</Text>
                  <Text style={styles.contentText}>{item.Content}</Text>
                </View>
            ))
        ) : (
            <Text>No codes found</Text>
        );
    };
    

    const combineContent = (data) => {
        //console.log(data)
        const result = [];
        let current = null;
      
        data.forEach((item) => {
          if (
            current &&
            current.ParticipantDetails.ParticipantRole === item.ParticipantDetails.ParticipantRole &&
            Math.abs(item.BeginAudioTime - current.EndAudioTime) <= 0.1
          ) {
            // Combine Content and update EndAudioTime
            current.Content += ` ${item.Content}`;
            current.EndAudioTime = item.EndAudioTime;
          } else if (
            current &&
            current.ParticipantDetails.ParticipantRole === item.ParticipantDetails.ParticipantRole 
          ) {
            // Combine Content and update EndAudioTime
            current.Content += ` \n\n${item.Content}`;
            current.EndAudioTime = item.EndAudioTime;
          } 
          else {
            // Push the current item to result and start a new group
            if (current) result.push(current);
            current = { ...item }; // Create a copy of the current item
          }
        });
      
        // Push the last processed item
        if (current) result.push(current);
      
        return result;
      };

    const increaseName = (name) => {
        const [text, number] = name.split("_");
        const updatedNumber = parseInt(number, 10) + 1;
        const formattedText = text.toLowerCase();
        const capitalizedText = formattedText.charAt(0).toUpperCase() + formattedText.slice(1);
        var speakerName = `${capitalizedText} #${updatedNumber}: `;
        return speakerName;
        
    }

    const renderItem = ({ item }) =>  (
        <View style={styles.itemContainer}>
        <Text style={styles.contentText}>{increaseName(item?.ParticipantDetails?.ParticipantRole)}</Text>
          <Text style={styles.contentText}>{item.Content}</Text>
        </View>
      );

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
                    {renderCodesSuggestedSearch()}
                    {/*
                    <FlatList
        data={combineContent(transcriptData?.TranscriptSegments)} // Pass the data array
        renderItem={renderItem} // Render each item
        keyExtractor={(item) => item.SegmentId} // Use SegmentId as a unique key
      />*/}
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
        //shadowColor: '#00',
        //shadowOffset: { width: 0, height: 1 },
        //shadowOpacity: 0.1,
        //shadowRadius: 2,
    },
    dropdownItem: {
        fontSize: 16,
        paddingVertical: 5,
        color: '#333',
    },
    contentText:{
        fontSize:18,
        fontWeight:500,
        padding:3
    },
    itemContainer:{
        //backgroundColor:"#ff0",
        marginBottom:10
    }
});

export default TranscriptBox;
