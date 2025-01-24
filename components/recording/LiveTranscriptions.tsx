import { useEffect } from 'react'

import {
  TranscribeStreamingClient,
  StartMedicalStreamTranscriptionCommand,
  LanguageCode,
} from '@aws-sdk/client-transcribe-streaming'
import { pEventIterator } from 'p-event'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

import {
  RecordingProperties,
  MessageDataType,
  LiveTranscriptionProps,
} from '../../types'
import { AWSAudioAggregator } from '../../shared/AWSAudioAggregator'

const sampleRate = import.meta.env.VITE_TRANSCRIBE_SAMPLING_RATE
const language = import.meta.env.VITE_TRANSCRIBE_LANGUAGE_CODE as LanguageCode
const audiosource = import.meta.env.VITE_TRANSCRIBE_AUDIO_SOURCE
let producer: AWSAudioAggregator

let speaker = '0'
const startStreaming = async (
  handleTranscribeOutput: (
    speaker: string,
    data: string,
    partial: boolean,
    transcriptionClient: TranscribeStreamingClient,
    mediaRecorder: AudioWorkletNode,
  ) => void,
  idToken: string,
) => {
  const audioContext = new window.AudioContext()
  let stream: MediaStream
  let addSequence = true

  if (audiosource === 'ScreenCapture') {
    stream = await window.navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    })
  } else {
    stream = await window.navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    })
  }

  const source1 = audioContext.createMediaStreamSource(stream)

  const recordingprops: RecordingProperties = {
    numberOfChannels: 1,
    sampleRate: audioContext.sampleRate,
    maxFrameCount: audioContext.sampleRate / 10,
  }

  try {
    await audioContext.audioWorklet.addModule(
      './worklets/recording-processor.js',
    )
  } catch (error) {
  }
  const mediaRecorder = new AudioWorkletNode(
    audioContext,
    'recording-processor',
    {
      processorOptions: recordingprops,
    },
  )

  const destination = audioContext.createMediaStreamDestination()

  mediaRecorder.port.postMessage({
    message: 'UPDATE_RECORDING_STATE',
    setRecording: true,
  })

  source1.connect(mediaRecorder).connect(destination)
  mediaRecorder.port.onmessageerror = error => {
  }

  const audioDataIterator = pEventIterator<
    'message',
    MessageEvent<MessageDataType>
  >(mediaRecorder.port, 'message')

  //The getAudioStream method below can be tailored to aggregate the audio stream bytes and create an audio file.
  const getAudioStream = async function* () {
    for await (const chunk of audioDataIterator) {
      if (chunk.data.message === 'SHARE_RECORDING_BUFFER') {
        const abuffer = pcmEncode(chunk.data.buffer[0])
        producer.putAudio(abuffer, addSequence) //Sending audio to AWS Kinesis
        addSequence = false
        const audiodata = new Uint8Array(abuffer)
        // call method to aggregate audio to streaming client
        yield {
          AudioEvent: {
            AudioChunk: audiodata,
          },
        }
      }
    }
  }
  const transcribeClient = new TranscribeStreamingClient({
    region: import.meta.env.VITE_REACT_APP_AWS_REGION as string,
    credentials: fromCognitoIdentityPool({
      clientConfig: {
        region: import.meta.env.VITE_REACT_APP_AWS_REGION as string,
      },
      identityPoolId: import.meta.env.VITE_REACT_APP_IDENTITY_POOL_ID,
      logins: {
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_ZRXeRemoP': idToken,
      },
    }),
  })

  //StartMedicalStreamTranscriptionCommand is what we will want to use.
  const command = new StartMedicalStreamTranscriptionCommand({
    LanguageCode: language,
    MediaEncoding: 'pcm',
    MediaSampleRateHertz: sampleRate,
    AudioStream: getAudioStream(),
    Specialty: 'PRIMARYCARE', //This can be changed to different medical specialties.
    Type: 'CONVERSATION',
    ShowSpeakerLabel: true,
  })
  const data = await transcribeClient.send(command)

  if (data.TranscriptResultStream) {
    for await (const event of data.TranscriptResultStream) {
      if (event?.TranscriptEvent?.Transcript) {
        for (const result of event?.TranscriptEvent?.Transcript.Results || []) {
          if (result?.Alternatives && result?.Alternatives[0].Items) {
            let completeSentence = ``

            for (const item of result.Alternatives[0].Items) {
              // @ts-expect-error need to find type
              if (item.Type !== 'speaker-change') {
                completeSentence += ` ${item.Content}`
              } else if (item.Speaker) {
                speaker = item.Speaker
              }
            }

            handleTranscribeOutput(
              speaker,
              completeSentence,
              result.IsPartial || false,
              transcribeClient,
              mediaRecorder,
            )
          }
        }
      }
    }
  }
}

const stopStreaming = async (
  mediaRecorder: AudioWorkletNode,
  transcribeClient: { destroy: () => void },
) => {
  if (mediaRecorder) {
    mediaRecorder.port.postMessage({
      message: 'UPDATE_RECORDING_STATE',
      setRecording: false,
    })

    mediaRecorder.port.close()
    mediaRecorder.disconnect()
  } else {
    console.log('no media recorder available to stop')
  }
  if (transcribeClient) {
    transcribeClient.destroy()
    console.log('Transcribe client has successfully been destroyed.')
  }
}

const pcmEncode = (input: Float32Array) => {
  const buffer = new ArrayBuffer(input.length * 2)
  const view = new DataView(buffer)
  for (let i = 0; i < input.length; i++) {
    const s = Math.max(-1, Math.min(1, input[i]))
    view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  return buffer
}

const LiveTranscriptions = (props: LiveTranscriptionProps) => {
  const {
    transcribeStatus,
    mediaRecorder,
    transcriptionClient,
    audioProducer,
    setMediaRecorder,
    setTranscriptionClient,
    setTranscript,
    idToken,
    onRecordingStopped,
  } = props

  producer = audioProducer
  const onTranscriptionDataReceived = (
    speaker: string,
    data: string,
    partial: boolean,
    transcriptionClient: TranscribeStreamingClient,
    mediaRecorder: AudioWorkletNode,
  ) => {
    setTranscript({
      speaker: speaker,
      channel: '0',
      partial: partial,
      text: data,
    })
    setMediaRecorder(mediaRecorder)
    setTranscriptionClient(transcriptionClient)
  }

  const startRecording = async () => {
    if (!idToken) {
      console.error('credentials not found')
      return
    }
    try {
      await startStreaming(onTranscriptionDataReceived, idToken)
    } catch (error) {
      alert(`An error occurred while recording: ${error}`)
      await stopRecording()
      if (onRecordingStopped) {
        onRecordingStopped()
      }
    }
  }

  const stopRecording = async () => {
    if (mediaRecorder && transcriptionClient) {
      await stopStreaming(mediaRecorder, transcriptionClient)
      if (onRecordingStopped) {
        onRecordingStopped()
      }
    } else {
      console.log('no media recorder')
    }
  }

  async function toggleTranscribe() {
    if (transcribeStatus) {
      console.log('startRecording')
      await startRecording()
    } else {
      console.log('stopRecording')
      await stopRecording()
    }
  }

  useEffect(() => {
    toggleTranscribe()
  }, [transcribeStatus])

  return <></>
}

export default LiveTranscriptions
