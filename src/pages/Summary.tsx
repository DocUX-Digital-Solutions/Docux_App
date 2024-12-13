import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'
import SidePanel from '../components/common/SidePanel'
import SummaryHeader from '../components/summary/SummaryHeader'
import SoapCard from '../components/summary/SoapCard'
import TranscriptCard from '../components/summary/TranscriptCard'
import TranscriptHeader from '../components/summary/TranscriptHeader'
import DiagnosticCodesCard from '../components/summary/DiagnosticCodesCard'
import BillingCodesCard from '../components/summary/BillingCodesCard'
import {
  PatchAppointmentRequest,
  useFetchAppointmentDetail,
  useSubmitAppointment,
  useUpdateAppointment,
} from '../hooks/useFetchAppointmentData'
import useDocuXtoast from '../components/common/Toast'
import LoadingSpinner from '../components/common/LoadingSpinner'

const Summary: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const appointmentId = queryParams.get('appointmentId')
  const [transcriptView, setTranscriptView] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const showToast = useDocuXtoast()

  const { mutate: updateAppointment, isPending: isUpdating } =
    useUpdateAppointment()
  const { mutate: submitAppointment, isPending: isSubmitting } =
    useSubmitAppointment()

  const {
    data: appointmentDetail,
    isLoading,
    error,
    refetch,
  } = useFetchAppointmentDetail(appointmentId as string)

  const methods = useForm<PatchAppointmentRequest>({
    defaultValues: {
      ...appointmentDetail?.encounters.soapNotes,
      diagnosticCodes: appointmentDetail?.encounters.diagnosticCodes || [],
    },
  })

  useEffect(() => {
    if (!isLoading && !appointmentId) {
      navigate('/')
    }
  }, [navigate, appointmentId, isLoading])

  useEffect(() => {
    if (appointmentDetail) {
      methods.reset({
        ...appointmentDetail.encounters.soapNotes,
        diagnosticCodes: appointmentDetail.encounters.diagnosticCodes || [],
      })
    }
  }, [appointmentDetail, methods])

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleCancelEdit = () => {
    refetch().then(() => {
      if (appointmentDetail) {
        methods.reset({
          ...appointmentDetail.encounters.soapNotes,
          diagnosticCodes: appointmentDetail.encounters.diagnosticCodes || [],
        })
      }
      setIsEditing(false)
    })
  }

  const handleSubmit = () => {
    if (!appointmentId) return

    submitAppointment(appointmentId, {
      onSuccess: () => {
        const assessmentText = methods.getValues('assessmentText')
        navigate('/case-submitted', {
          state: { assessmentText },
        })
      },
      onError: error => {
        showToast({
          title: 'Submission Failed',
          description: `There was an error submitting the appointment: ${error.message}`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        console.error('Error submitting appointment:', error)
      },
    })
  }

  const onSave = async (data: PatchAppointmentRequest) => {
    updateAppointment(
      { appointmentId: appointmentId as string, patchData: data },
      {
        onSuccess: () => {
          showToast({
            title: 'Appointment updated',
            description: 'The appointment has been successfully updated.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          setIsEditing(false)
        },
        onError: error => {
          showToast({
            title: 'Update failed',
            description: `There was an error updating the appointment: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
          console.error('Error updating appointment:', error)
        },
      },
    )
  }

  if (isLoading) return <LoadingSpinner />
  if (error) {
    if (
      error.message.includes(
        'Unauthenticated access is not supported for this identity pool.',
      )
    ) {
      navigate('/login')
    } else {
      return <div>An error occurred: {error.message}</div>
    }
  }

  return (
    <FormProvider {...methods}>
      <Flex
        h="100vh"
        overflow="hidden"
        as="form"
        onSubmit={methods.handleSubmit(onSave)}
      >
        <SidePanel />
        <Flex flexGrow={1} direction="column" overflow="hidden">
          <SummaryHeader
            handleSubmit={handleSubmit}
            handleSave={methods.handleSubmit(onSave)}
            onEditToggle={handleEditToggle}
            isEditing={isEditing}
            isUpdating={isUpdating}
            isSubmitting={isSubmitting}
            handleCancelEdit={handleCancelEdit}
          />
          <Flex flexGrow={1} p={4} bgColor="#F5F5F7" overflow="hidden">
            {transcriptView && (
              <Box flexGrow={0} flexShrink={0} flexBasis="50%" mr={4}>
                <TranscriptHeader
                  audioReference={appointmentDetail!.encounters!.audioReference}
                  setTranscriptView={setTranscriptView}
                />
                <TranscriptCard
                  transcriptReference={
                    appointmentDetail!.encounters.transcriptionReference
                  }
                />
              </Box>
            )}
            <Box
              flexGrow={0}
              flexShrink={0}
              flexBasis={transcriptView ? '50%' : '70%'}
              mr={4}
            >
              <SoapCard
                soapNotes={appointmentDetail!.encounters.soapNotes}
                transcriptStatus={transcriptView}
                setTranscriptView={setTranscriptView}
                isEditing={isEditing}
              />
            </Box>
            {!transcriptView && (
              <Box flexGrow={1} display="flex" flexDirection="column" gap={4}>
                <Box
                  flex="1"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  boxShadow="md"
                  display="flex"
                  flexDirection="column"
                >
                  <Box flex="1" overflowY="auto">
                    <DiagnosticCodesCard
                      suggested={
                        appointmentDetail!.encounters.suggestedDiagnosticCodes
                      }
                      isEditing={isEditing}
                    />
                  </Box>
                </Box>
                <Box
                  flex="1"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="white"
                  boxShadow="md"
                  display="flex"
                  flexDirection="column"
                >
                  <Box flex="1" overflowY="auto">
                    <BillingCodesCard />
                  </Box>
                </Box>
              </Box>
            )}
          </Flex>
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export default Summary
