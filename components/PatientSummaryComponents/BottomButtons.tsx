import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Keyboard, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const screenWidth = Dimensions.get('window').width;

const BottomButtons = ({navGoHome}) => {

    return (
        <View style={styles.container}>
                {/*
                <View style={styles.menuItem}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="arrow-left-thick" size={30} color="#7a7a7b" />
                    </TouchableOpacity>
                    <Text style={styles.visitInProgressText}>Visit In Progress: </Text>
                    <Text style={[styles.recordingText, { color: recordingColor }]}>{recordingState}</Text>
                </View>*/}
                <TouchableOpacity style={styles.editButtonStyle}>
                        <View style={styles.editIcon}>
                        <Icon name='note-edit-outline' size={30} color="#fff" />
                        </View>
                        <Text style={styles.buttonText}>EDIT</Text>
                    </TouchableOpacity>
                                  <TouchableOpacity style={styles.submitButtonStyle} onPress={()=>navGoHome()}>
                        <Text style={styles.buttonText}>SUBMIT</Text>
                    </TouchableOpacity>
                    
  
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        backgroundColor: 'transparent',
      

        alignSelf: 'center',
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'flex-end',
        
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    visitInProgressText: {
        color: '#969696',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8, // Space between icon and text
    },
    recordingText: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    editIcon:{
        right:"7%"
    },
    editButtonStyle: {
        backgroundColor: '#42526D',
        height: 50,
        borderRadius: 25,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "3%",
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    submitButtonStyle: {
        backgroundColor: '#346AAC',
        height: 50,
        borderRadius: 25,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "1%",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default BottomButtons;
