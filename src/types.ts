import { TranscribeStreamingClient } from '@aws-sdk/client-transcribe-streaming'
import { AWSAudioAggregator } from './shared/AWSAudioAggregator.tsx'

export interface Transcript {
  speaker: string
  channel: string
  partial?: boolean
  text?: string
}

export interface LiveTranscriptionProps {
  mediaRecorder: AudioWorkletNode | undefined
  audioProducer: AWSAudioAggregator
  setMediaRecorder: (m: AudioWorkletNode) => void
  setTranscriptionClient: (a: TranscribeStreamingClient) => void
  transcriptionClient: TranscribeStreamingClient | null
  transcribeStatus: boolean
  setTranscript: (t: Transcript) => void
  idToken: string
  onRecordingStopped: () => void
}

export type RecordingProperties = {
  numberOfChannels: number
  sampleRate: number
  maxFrameCount: number
}

export type MessageDataType = {
  message: string
  buffer: Array<Float32Array>
  recordingLength: number
}

export type Summary = {
  transcript: string
}
