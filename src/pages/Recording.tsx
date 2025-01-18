import SidePanel from '../components/common/SidePanel'
import RecordingHeader from '../components/recording/RecordingHeader'
import PatientCard from '../components/recording/PatientCard'
import TranscriptCard from '../components/recording/TranscriptCard'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { AWSAudioAggregator } from '../shared/AWSAudioAggregator'
import { Transcript } from '../types.ts'
import LiveTranscriptions from '../components/recording/LiveTranscriptions.tsx'
import { TranscribeStreamingClient } from '@aws-sdk/client-transcribe-streaming'
import {
  useEndAppointment,
  usePauseAppointment,
  useStartAppointment,
} from '../hooks/useFetchAppointmentData.ts'
import useDocuXtoast from '../components/common/Toast.tsx'

interface RecordingProps {
  appointmentId: string
  patientType: string
  patientName: string
  currentTime: string
  reasonForVisit: string
  idToken: string
  physicianId: string
  isNewAppointment: boolean
}

const Recording: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const showToast = useDocuXtoast()
  const { mutate: startAppointment } = useStartAppointment()
  const { mutate: pauseAppointment } = usePauseAppointment()
  const { mutate: endAppointment } = useEndAppointment()
  const state = location.state as RecordingProps
  const streamARN = import.meta.env.VITE_STREAM_ARN
  const streamName = import.meta.env.VITE_STREAM_NAME
  const queueARN = import.meta.env.VITE_QUEUE_ARN
  const region = import.meta.env.VITE_REACT_APP_AWS_REGION
  const audioProducer = useRef(
    new AWSAudioAggregator(
      state.idToken,
      state.physicianId,
      streamARN,
      streamName,
      state?.appointmentId,
      queueARN,
      region,
    ),
  )

  const [isRecording, setIsRecording] = useState(false)
  const [lines, setLines] = useState<Transcript[]>([])
  const [currentLine, setCurrentLine] = useState<Transcript[]>([])
  const [transcript, setTranscript] = useState<Transcript>()
  const [mediaRecorder, setMediaRecorder] = useState<AudioWorkletNode>()
  const [transcriptionClient, setTranscriptionClient] =
    useState<TranscribeStreamingClient | null>(null)

  useEffect(() => {
    if (transcript) {
      setTranscript(transcript)
      if (transcript.partial) {
        setCurrentLine([transcript])
      } else {
        setLines([...lines, transcript])
        setCurrentLine([])
      }
    }
  }, [transcript])

  useEffect(() => {
    if (
      !state?.appointmentId ||
      !state?.patientType ||
      !state?.patientName ||
      !state?.currentTime ||
      !state?.reasonForVisit
    ) {
      navigate('/')
    }
  }, [state, navigate])

  const recordingStoppedPromiseRef = useRef<{
    resolve: () => void
    reject: (error: Error) => void
  } | null>(null)

  if (!state) {
    return null
  }

  const waitForRecordingToStopAndBatch = (): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      recordingStoppedPromiseRef.current = { resolve, reject }
    })
  }

  const handleRecordingStopped = async () => {
    try {
      await audioProducer.current.batchRecords()
      if (recordingStoppedPromiseRef.current) {
        recordingStoppedPromiseRef.current.resolve()
        recordingStoppedPromiseRef.current = null
      }
    } catch (error) {
      if (recordingStoppedPromiseRef.current) {
        recordingStoppedPromiseRef.current.reject(error as Error)
        recordingStoppedPromiseRef.current = null
      }
    }
  }

  const handleToggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false)
      try {
        await waitForRecordingToStopAndBatch()
        // Proceed after recording has stopped and batching is done
        if (
          audioProducer.current.shardId &&
          audioProducer.current.sequenceNum
        ) {
          pauseAppointment(
            {
              appointmentId: state.appointmentId,
              shardId: audioProducer.current.shardId,
              sequenceNum: audioProducer.current.sequenceNum,
            },
            {
              onSuccess: () => {
                showToast({
                  title: 'Recording Paused',
                  description: 'The recording has been successfully paused.',
                  status: 'info',
                  duration: 3000,
                  isClosable: true,
                })
              },
              onError: error => {
                showToast({
                  title: 'Error Pausing Recording',
                  description: `Failed to pause the recording: ${error.message}`,
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
              },
            },
          )
        } else {
          showToast({
            title: 'Error',
            description: 'ShardId or SequenceNum is missing.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
      } catch (error) {
        showToast({
          title: 'Error Batching Records',
          description: `Failed to batch audio records: ${
            (error as Error).message
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } else {
      setIsRecording(true)
    }
  }

  const handleEndVisit = async () => {
    if (isRecording) {
      setIsRecording(false)
      try {
        await waitForRecordingToStopAndBatch()
      } catch (error) {
        showToast({
          title: 'Error Batching Records',
          description: `Failed to batch audio records: ${
            (error as Error).message
          }`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return
      }
    }

    if (!audioProducer.current.shardId || !audioProducer.current.sequenceNum) {
      showToast({
        title: 'Error',
        description: 'Cannot end visit: shardId or sequenceNum is missing.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    endAppointment(
      {
        appointmentId: state.appointmentId,
        shardId: audioProducer.current.shardId,
        sequenceNum: audioProducer.current.sequenceNum,
      },
      {
        onSuccess: () => {
          setIsRecording(false)
          navigate(`/summary?appointmentId=${state.appointmentId}`)
          showToast({
            title: 'Visit Ended',
            description: 'The visit has ended successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        },
        onError: error => {
          showToast({
            title: 'Error Ending Visit',
            description: `An error occurred while ending the visit: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        },
      },
    )
  }

  const handleStartRecording = () => {
    if (state.isNewAppointment) {
      startAppointment(state.appointmentId, {
        onSuccess: () => setIsRecording(true), // Begin recording after successful start
        onError: error => {
          showToast({
            title: 'Error Starting Appointment',
            description: `An error occurred while starting the appointment: ${error.message}`,
            status: 'error',
            duration: null,
            isClosable: true,
          })
        },
      })
    } else {
      setIsRecording(true) // For resumed appointments, just set recording status
    }
  }

  const { patientType, patientName, currentTime, reasonForVisit } = state

  return (
    <Flex h="100vh" overflow="hidden">
      <SidePanel />
      <Flex flexGrow={1} direction="column" overflow="hidden">
        <RecordingHeader
          handleEndVisit={handleEndVisit}
          onStartRecording={handleStartRecording}
          onToggleRecording={handleToggleRecording}
          isRecording={isRecording}
        />
        <Flex flexGrow={1} p={4} bgColor="#F5F5F7">
          <Box flexGrow={0} flexShrink={0} flexBasis="25%" mr={4}>
            <PatientCard
              patientType={patientType}
              patientName={patientName}
              currentTime={currentTime}
              reasonForVisit={reasonForVisit}
            />
          </Box>
          <Box flexGrow={1} display="flex" flexDirection="column">
            <TranscriptCard>
              <div>
                {lines.map((line, index) => {
                  return (
                    <div key={index}>
                      <strong>Speaker {line.speaker}</strong>: {line.text}
                      <br />
                    </div>
                  )
                })}
                {currentLine.length > 0 &&
                  currentLine.map((line, index) => {
                    return (
                      <div key={index}>
                        <strong>Channel {line.channel}</strong>: {line.text}
                        <br />
                      </div>
                    )
                  })}
              </div>
            </TranscriptCard>
          </Box>
        </Flex>
      </Flex>
      <LiveTranscriptions
        mediaRecorder={mediaRecorder}
        audioProducer={audioProducer.current}
        setMediaRecorder={setMediaRecorder}
        setTranscriptionClient={setTranscriptionClient}
        transcriptionClient={transcriptionClient}
        transcribeStatus={isRecording}
        setTranscript={setTranscript}
        idToken={state.idToken}
        onRecordingStopped={handleRecordingStopped}
      />
    </Flex>
  )
}

export default Recording
