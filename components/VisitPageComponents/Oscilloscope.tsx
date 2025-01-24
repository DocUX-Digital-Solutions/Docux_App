import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';
import { Dimensions } from 'react-native';
import {
  Predictions,
} from '@aws-amplify/predictions';
import * as Permissions from 'expo-permissions';
const windowWidth = Dimensions.get('window').width;
const Oscilloscope = ({ recordingval }) => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState('');
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [volume, setVolume] = useState(0);
  const [waveformData, setWaveformData] = useState([1, 40.042036056518555, 35.07398986816406, 52.26547622680664, 51.89678764343262, 33.73213005065918, 52.454607009887695, 36.53604698181152, 48.97019004821777, 62.24841499328613, 44.37959289550781, 30.079124450683594, 47.778602600097656, 32.13315010070801, 34.44539451599121, 57.36661720275879, 41.63846397399902, 38.360504150390625, 34.755197525024414, 34.66284370422363, 53.03128623962402, 58.94186210632324, 45.26422691345215, 36.56785583496094, 69.64474296569824, 50.77722358703613, 33.51218605041504, 73.18951606750488, 54.1182746887207, 35.80257225036621, 33.75017738342285, 49.66782760620117, 39.82294464111328, 32.06803894042969, 38.243459701538086, 34.01443290710449, 57.78250694274902, 40.723886489868164]);
  
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: recording} = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      await recording.startAsync();

      // Monitor volume level
      const intervalId = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status.canRecord) {
          setWaveformData(prevData => {
            const newValue = Math.max((40 + status.metering) > 10 ? (40 + status.metering) * 3 : 5, 5);

            if (newValue == 5) { return prevData; }
            const newData = [...prevData, newValue];

            if (newData.length > 20) {
              newData.shift(); // Remove the oldest data point to create a scrolling effect
            }
            return newData;
          });
          //const audioBytes = await recording.getDataAsync();

        // Convert and send audio to AWS Predictions service for transcription
          //convertSpeechToText(audioBytes.uri);  // Use the URI for audio file
        } else {
          clearInterval(intervalId); // Stop the interval if recording is not active
        }
      }, 150); // Check every 300 milliseconds
    } catch (err) {

    }
  };
  const convertSpeechToText = async (audioBytes) => {
    try {
      const result = await Predictions.convert({
        transcription: {
          source: {
            bytes: audioBytes
          },
          // You can specify the language if needed, e.g., "en-US"
          // language: "en-US",
        }
      });
  
      const { transcription: { fullText } } = result;
    } catch (err) {
      console.error({ err });
    }
  };
  const stopRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        //const audioBytes = await recording.getDataAsync();
        convertSpeechToText(uri);
        setRecordingUri(uri);
        setRecording(null);
      } catch (error) {
      }
    }
  };

  const startPlayback = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPlayTime(AudioUtils.mmssss(status.positionMillis));
          setDuration(AudioUtils.mmssss(status.durationMillis));
        }
      });
      await sound.playAsync();
    } catch (error) {
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  };
  if (recordingval) {
    startRecording();
  } else {
    stopRecording();
  }
  const Waveform = ({ data }) => {
    const height = 100; // Height of the SVG
    const width = windowWidth - 120;
    const barWidth = 5;
    const maxAmplitude = 80; // Avoid division by zero
    const scalingFactor = 3; // Control non-linear scaling (higher = more dramatic)

    return (
      <Svg height={height} width={width}>
        {data.map((point, index) => {
          // Apply non-linear scaling to exaggerate differences
          const scaledPoint = Math.pow(point / maxAmplitude, scalingFactor) * maxAmplitude;

          const barHeight = (scaledPoint / maxAmplitude) * (20 / 2);
          return (
            <Rect
              key={index}
              x={index * (barWidth + 2)} // Slight spacing between bars
              y={(50 / 2) - barHeight}
              width={barWidth - 2} // Make bars thinner for clarity
              height={barHeight * 2} // Symmetrical height adjustment
              rx={10} // Adjust this value for more or less rounding
              ry={1} // Same as above; usually set equal to `rx`
              fill="black"
              style={styles.block}
            />

          );
        })}
      </Svg>
    );
  };


  return (
    <View style={styles.container}>
      {recordingval ? (<Waveform data={waveformData} />) : (
        <Text style={styles.pausedText}>recording paused</Text>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 0,

  },
  block: {
    width: 200,
    height: 100,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  pausedText: {
    color: '#979797',
    fontSize: 20
  }
});

const AudioUtils = {
  mmssss: (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  },
};

export default Oscilloscope;