import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Keyboard, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const screenWidth = Dimensions.get('window').width;

const RecordingButtons = ({ appointmentsNumber, useExpand, navigation }) => {
    const [recording, setRecording] = useState(null);
    const [sound, setSound] = useState(null);
    const widthAnim = useRef(new Animated.Value(50)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current; // Opacity animation value
    const searchBarRef = useRef(null);
    const [recordingState, setRecordingState] = useState('Not Recording');
    const [recordingStateButton, setRecordingStateButton] = useState('START');
    const [recordingIcon, setRecordingIcon] = useState("play");
    const [recordingColor, setRecordingColor] = useState("#969696");

    const updateButtonState = async () => {
        if (recordingStateButton !== "PAUSE") {
            //await startRecording();
            setRecordingState("Recording");
            setRecordingStateButton("PAUSE");
            setRecordingIcon("pause");
            setRecordingColor("#346aac");
        } else {
            //await stopRecording();
            setRecordingState("Paused");
            setRecordingStateButton("RECORD");
            setRecordingIcon("play");
            setRecordingColor("#969696");
        }
    };

    const handleFocus = () => {
        if (!useExpand) return;

        setIsFocused(true);
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: screenWidth * 0.9, // Expand to nearly full screen width
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            await recording.startAsync();
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    const stopRecording = async () => {
        console.log('Stopping recording..');
        if (recording) {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording stopped and stored at', uri);

            // Move the file to a specific location
            const newUri = `${FileSystem.documentDirectory}recordings/recording-${Date.now()}.m4a`;
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}recordings`, { intermediates: true });
            await FileSystem.moveAsync({
                from: uri,
                to: newUri,
            });
            console.log('Recording moved to', newUri);

            const { sound } = await recording.createNewLoadedSoundAsync();
            setSound(sound);
            setRecording(null);
        }
    };

    const playSound = async () => {
        console.log('Playing sound');
        if (sound) {
            await sound.playAsync();
        }
    };

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
                    <TouchableOpacity style={styles.pausedPlayButton} onPress={updateButtonState}>
                        <View style={styles.playPauseIcon}>
                        <Icon name={recordingIcon} size={30} color="#fff" />
                        </View>
                        <Text style={styles.buttonText}>{recordingStateButton}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.endButton}>
                        <Text style={styles.buttonText}>END VISIT</Text>
                    </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '96%',
        backgroundColor: 'transparent',
        paddingTop: 40,

        borderBottomColor: '#ebebec',
        borderBottomWidth: 1,
        alignSelf: 'center',
        paddingBottom: 50,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
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

    playPauseIcon:{
        right:"7%"
    },
    pausedPlayButton: {
        backgroundColor: '#8c349b',
        height: 50,
        borderRadius: 25,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "3%",
        flexDirection: 'row',
    },
    endButton: {
        backgroundColor: '#336aac',
        height: 50,
        borderRadius: 25,
        width: "40%",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "1%",
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default RecordingButtons;
