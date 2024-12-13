import { Flex, Button, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'

const TranscriptHeader: React.FC<{
  audioReference: string
  setTranscriptView: (t: boolean) => void
}> = ({ audioReference, setTranscriptView }) => {
  const location = useLocation()
  const state = location.state
  const [audioUrl, setAudioUrl] = useState('')

  const disableTranscriptView = async () => {
    setTranscriptView(false)
  }
  useEffect(() => {
    const fetchAudioUrl = async () => {
      const s3Client = new S3Client({
        region: import.meta.env.VITE_REACT_APP_AWS_REGION as string,
        credentials: fromCognitoIdentityPool({
          clientConfig: {
            region: import.meta.env.VITE_REACT_APP_AWS_REGION as string,
          },
          identityPoolId: import.meta.env.VITE_REACT_APP_IDENTITY_POOL_ID,
          logins: {
            'cognito-idp.us-east-1.amazonaws.com/us-east-1_ZRXeRemoP':
              state?.idToken,
          },
        }),
      })

      const params = {
        Bucket: import.meta.env.VITE_AUDIO_BUCKET,
        Key: audioReference,
      }
      const command = new GetObjectCommand(params)
      const response = await s3Client.send(command)
      // @ts-expect-error: response could be null
      const blob = await response.Body.transformToByteArray()
      const blobUrl = URL.createObjectURL(new Blob([blob]))

      // Set the audio URL in the state
      setAudioUrl(blobUrl)
    }
    fetchAudioUrl()
  }, [])
  return (
    <Flex direction={'row'} justifyContent="space-between" mb={4}>
      <Button colorScheme="blue" variant="link" onClick={disableTranscriptView}>
        Hide Transcript
      </Button>
      <Box bg="white" p={3} borderRadius="md" boxShadow="sm">
        {audioUrl ? (
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <p>Loading audio...</p>
        )}
      </Box>
    </Flex>
  )
}

export default TranscriptHeader
