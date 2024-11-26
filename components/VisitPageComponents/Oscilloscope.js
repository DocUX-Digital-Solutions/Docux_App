import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Svg, Rect } from 'react-native-svg';

const Oscilloscope = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingUri, setRecordingUri] = useState('');
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [volume, setVolume] = useState(0);
  const [waveformData, setWaveformData] = useState([10,1,1,1]);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      await recording.startAsync();

      // Monitor volume level
      const intervalId = setInterval(async () => {
        const status = await recording.getStatusAsync();
        if (status.canRecord) {
          setWaveformData(prevData => {
            const newData = [...prevData, Math.max((60 + status.metering) > 10 ? (60 + status.metering) * 3 : 5, 5)];
            if (newData.length > 30) {
              newData.shift(); // Remove the oldest data point to create a scrolling effect
            }
            return newData;
          });
          console.log('Volume level:', Math.max((60 + status.metering) > 10 ? (60 + status.metering) * 3 : 60 + status.metering, 1));
        } else {
          console.log('Recording is not active.');
          clearInterval(intervalId); // Stop the interval if recording is not active
        }
      }, 150); // Check every 300 milliseconds
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecordingUri(uri);
        setRecording(null);
        console.log('Recording stopped and stored at', uri);
      } catch (error) {
        console.error('Failed to stop recording', error);
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
      console.error('Failed to play recording', error);
    }
  };

  const stopPlayback = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  };

  const Waveform = ({ data }) => {
    const height = 200;
    const width = 300;
    const barWidth = 10;
    const maxAmplitude = 100; // Avoid division by zero

    return (
      <Svg height={height} width={width}>
        {data.map((point, index) => {
          const barHeight = (point / maxAmplitude) * (height / 4);
          return (
            <Rect
              key={index}
              x={index * barWidth}
              y={(height / 2) - barHeight}
              width={barWidth-3}
              height={barHeight * 2}
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
      <Text>Recording Time: {recordTime}</Text>
      <Button title="Start Recording" onPress={startRecording} disabled={recording !== null} />
      <Button title="Stop Recording" onPress={stopRecording} disabled={recording === null} />
      <Text>Volume Level: {volume}</Text>
      <Text>Play Time: {playTime} / {duration}</Text>
      <Button title="Start Playback" onPress={startPlayback} disabled={!recordingUri} />
      <Button title="Stop Playback" onPress={stopPlayback} disabled={!sound} />
      <Waveform data={waveformData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  block:{
    borderRadius: 30,
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