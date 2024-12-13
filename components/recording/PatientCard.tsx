import { Text } from '@chakra-ui/react'
import React from 'react'
import Card from '../common/Card'
import { formatTime } from '../../utils/Utils'

interface PatientCardProps {
  patientType: string
  patientName: string
  currentTime: string
  reasonForVisit: string
}

const PatientCard: React.FC<PatientCardProps> = ({
  patientType,
  patientName,
  currentTime,
  reasonForVisit,
}) => {
  return (
    <Card>
      <Text as="b" fontSize="md" textTransform="uppercase" mb={4}>
        {patientType}
      </Text>
      <Text fontSize="md">Patient: {patientName}</Text>
      <Text fontSize="md">Time: {formatTime(currentTime)}</Text>
      <Text fontSize="md" mb={4}>
        Read for Visit: {reasonForVisit}
      </Text>
    </Card>
  )
}

export default PatientCard
