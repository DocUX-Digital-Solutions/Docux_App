import { Box, Flex, Text, List, ListItem, ListIcon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'
import { VscCircleFilled } from 'react-icons/vsc'

type TranscriptType = {
  TranscriptSegments: [
    {
      BeginAudioTime: number
      Content: string
      EndAudioTime: number
      ParticipantDetails: {
        ParticipantRole: string
      }
      SectionDetails: {
        SectionName: string
      }
      SegmentId: string
    },
  ]
}
const TranscriptCard: React.FC<{
  transcriptReference: string
}> = ({ transcriptReference }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state
  const [transcriptData, setTranscriptData] = useState<TranscriptType>({
    TranscriptSegments: [
      {
        BeginAudioTime: 0,
        Content: '',
        EndAudioTime: 0,
        ParticipantDetails: {
          ParticipantRole: '',
        },
        SectionDetails: {
          SectionName: '',
        },
        SegmentId: '',
      },
    ],
  })

  useEffect(() => {
    if (!state?.idToken) {
      navigate('/')
    }
  }, [state, navigate])

  useEffect(() => {
    const fetchData = async () => {
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
        Bucket: import.meta.env.VITE_TRANSCRIPT_BUCKET,
        Key: transcriptReference,
      }
      const command = new GetObjectCommand(params)
      const response = await s3Client.send(command)

      // @ts-expect-error: response could be null
      const bodyContents = await response.Body.transformToString()
      const data = JSON.parse(bodyContents)
      setTranscriptData(data)
    }
    fetchData()
  }, [])
  return (
    <Box
      bg="white"
      p={4}
      shadow="md"
      borderWidth="2px"
      borderRadius="lg"
      flex="1"
      height="calc(100vh - 195px)"
      overflowY="auto"
    >
      <Flex direction="column" align="flex-start">
        <List spacing={2}>
          {transcriptData.TranscriptSegments.map(item => (
            <ListItem>
              <Flex direction="row" align="center">
                <ListIcon
                  as={VscCircleFilled}
                  color={
                    item.ParticipantDetails.ParticipantRole.startsWith(
                      'CLINICIAN',
                    )
                      ? 'gray'
                      : 'blue.500'
                  }
                />
                <Text
                  as={'b'}
                  textAlign={'left'}
                  color={
                    item.ParticipantDetails.ParticipantRole.startsWith(
                      'CLINICIAN',
                    )
                      ? 'gray'
                      : 'black'
                  }
                >
                  {item.ParticipantDetails.ParticipantRole.startsWith(
                    'CLINICIAN',
                  )
                    ? 'Dr. Blaine:\t'
                    : 'Patient:\t'}
                </Text>
                <Text
                  fontSize="md"
                  textAlign={'left'}
                  color={
                    item.ParticipantDetails.ParticipantRole.startsWith(
                      'CLINICIAN',
                    )
                      ? 'gray'
                      : 'black'
                  }
                >
                  {'\t' + item.Content}
                </Text>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  )
}

export default TranscriptCard
