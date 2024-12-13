import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Box,
  Flex,
  Text,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

interface SoapFormProps {
  subjectiveText: string
  objectiveText: string
  assessmentText: string
  planTexts: string[]
  reviewOfSystemsText: string
  pastMedicalHistoryText: string
  physicalExaminationText: string
  pastFamilyHistoryText: string
  pastSocialHistoryText: string
  diagnosticTestingText: string
  allergiesText: string
}

interface StyledTextareaProps extends TextareaAutosizeProps {
  isEditing: boolean
}

const StyledTextareaAutosize = styled(TextareaAutosize)<StyledTextareaProps>`
  width: 100%;
  max-height: 900px;
  padding: 10px;
  border: ${props => (props.isEditing ? '2px solid #E2E8F0' : 'none')};
  resize: none;
  overflow: hidden;
  min-height: 40px;
  text-align: left;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  background: ${props => (props.isEditing ? 'white' : 'transparent')};
`

const SoapCard: React.FC<{
  soapNotes: SoapFormProps
  transcriptStatus: boolean
  setTranscriptView: (t: boolean) => void
  isEditing: boolean
}> = ({ transcriptStatus, setTranscriptView, isEditing }) => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<SoapFormProps>()

  const planTexts = watch('planTexts', [])

  const [newPlanItem, setNewPlanItem] = useState('')

  const toggleTranscriptView = () => {
    setTranscriptView(true)
  }

  const removePlanItem = (index: number) => {
    const updatedPlanTexts = planTexts.filter((_, i) => i !== index)
    setValue('planTexts', updatedPlanTexts)
  }

  const addPlanItem = () => {
    if (newPlanItem.trim() !== '') {
      const updatedPlanTexts = [...planTexts, newPlanItem]
      setValue('planTexts', updatedPlanTexts)
      setNewPlanItem('')
    }
  }

  return (
    <Box
      bg="white"
      p={4}
      shadow="md"
      borderWidth="2px"
      borderRadius="lg"
      flex="1"
      overflowY="auto"
      height="calc(100vh - 100px)"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="xl" fontWeight="bold">
          SOAP NOTE
        </Text>
        {!transcriptStatus && (
          <Button onClick={toggleTranscriptView}>View Transcript</Button>
        )}
      </Flex>

      <Flex direction="column" align="flex-start">
        <FormControl isInvalid={!!errors.subjectiveText}>
          {/* todo create component for FormTextArea */}
          <FormLabel htmlFor="subjectiveText" fontWeight="bold">
            Chief Complaint and History of Present Illness
          </FormLabel>
          <StyledTextareaAutosize
            id="subjectiveText"
            {...register('subjectiveText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.subjectiveText && errors.subjectiveText.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.reviewOfSystemsText}>
          <FormLabel htmlFor="reviewOfSystemsText" fontWeight="bold">
            Review of Systems
          </FormLabel>
          <StyledTextareaAutosize
            id="reviewOfSystemsText"
            {...register('reviewOfSystemsText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.reviewOfSystemsText && errors.reviewOfSystemsText.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.pastMedicalHistoryText}>
          <FormLabel htmlFor="pastMedicalHistoryText" fontWeight="bold">
            Past Medical History
          </FormLabel>
          <StyledTextareaAutosize
            id="pastMedicalHistoryText"
            {...register('pastMedicalHistoryText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.pastMedicalHistoryText &&
              errors.pastMedicalHistoryText.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.pastFamilyHistoryText}>
          <FormLabel htmlFor="pastFamilyHistoryText" fontWeight="bold">
            Past Family History
          </FormLabel>
          <StyledTextareaAutosize
            id="pastFamilyHistoryText"
            {...register('pastFamilyHistoryText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.pastFamilyHistoryText &&
              errors.pastFamilyHistoryText.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.pastSocialHistoryText}>
          <FormLabel htmlFor="pastSocialHistoryText" fontWeight="bold">
            Past Social History
          </FormLabel>
          <StyledTextareaAutosize
            id="pastSocialHistoryText"
            {...register('pastSocialHistoryText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.pastSocialHistoryText &&
              errors.pastSocialHistoryText.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.physicalExaminationText}>
          <FormLabel htmlFor="physicalExaminationText" fontWeight="bold">
            Physical Examination
          </FormLabel>
          <StyledTextareaAutosize
            id="physicalExaminationText"
            {...register('physicalExaminationText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.physicalExaminationText &&
              errors.physicalExaminationText.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.diagnosticTestingText}>
          <FormLabel htmlFor="diagnosticTestingText" fontWeight="bold">
            Diagnostic Testing
          </FormLabel>
          <StyledTextareaAutosize
            id="diagnosticTestingText"
            {...register('diagnosticTestingText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.diagnosticTestingText &&
              errors.diagnosticTestingText.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={4} isInvalid={!!errors.assessmentText}>
          <FormLabel htmlFor="assessmentText" fontWeight="bold">
            Assessment
          </FormLabel>
          <StyledTextareaAutosize
            id="assessmentText"
            {...register('assessmentText', {
              required: 'This field is required',
            })}
            readOnly={!isEditing}
            isEditing={isEditing}
          />
          <FormErrorMessage>
            {errors.assessmentText && errors.assessmentText.message}
          </FormErrorMessage>
        </FormControl>

        {/* Plan Section */}
        <Flex direction="column" align="flex-start" width="100%">
          <FormControl mt={4} isInvalid={!!errors.planTexts}>
            <FormLabel fontWeight="bold">Plan</FormLabel>
            {planTexts.map((_, index) => (
              <Flex key={index} align="center" mb={2}>
                <Text mr={2}>-</Text>
                <Controller
                  name={`planTexts.${index}`}
                  control={control}
                  render={({ field }) => (
                    <StyledTextareaAutosize
                      {...field}
                      readOnly={!isEditing}
                      value={field.value || ''}
                      onChange={e => field.onChange(e.target.value)}
                      isEditing={isEditing}
                    />
                  )}
                />
                {isEditing && (
                  <Button ml={2} onClick={() => removePlanItem(index)}>
                    Remove
                  </Button>
                )}
              </Flex>
            ))}

            {isEditing && (
              <Flex mt={4} align="center">
                <Text mr={2} flexShrink={0}>
                  -
                </Text>
                <StyledTextareaAutosize
                  value={newPlanItem}
                  onChange={e => setNewPlanItem(e.target.value)}
                  placeholder="Add new plan item"
                  minRows={1}
                  isEditing={isEditing}
                />
                <Button ml={2} onClick={addPlanItem}>
                  Add
                </Button>
              </Flex>
            )}
            <FormErrorMessage>
              {errors.planTexts && errors.planTexts.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
      </Flex>
    </Box>
  )
}

export default SoapCard
