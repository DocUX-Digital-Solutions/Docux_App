import { useEffect, useState } from 'react'
import { Grid, GridItem, Text, Button, Flex, Box } from '@chakra-ui/react'
import Card from '../components/common/Card'
import Header from '../components/home/Header'
import { TabNames } from '../components/home/types'
import SidePanel from '../components/home/HomeSidePanel'
import { useNavigate } from 'react-router-dom'
import { fetchAuthSession } from 'aws-amplify/auth'
import {
  Appointment,
  useFetchAppointmentData,
} from '../hooks/useFetchAppointmentData'
import { JWT } from '@aws-amplify/core'
import { formatTime, isToday, isTomorrow } from '../utils/Utils'

const Home = () => {
  const navigate = useNavigate()
  const { data: appointmentData, isLoading, error } = useFetchAppointmentData()
  const [currentTab, setCurrentTab] = useState<TabNames>('today')
  const [tabData, setTabData] = useState<Appointment[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const todayData = appointmentData
    ? appointmentData.filter(
        item =>
          isToday(item.scheduledAt) &&
          item.appointmentState.appointmentStateName === 'Scheduled',
      )
    : []
  const tomorrowData = appointmentData
    ? appointmentData.filter(
        item =>
          isTomorrow(item.scheduledAt) &&
          item.appointmentState.appointmentStateName === 'Scheduled',
      )
    : []
  const inReviewData = appointmentData
    ? appointmentData.filter(
        item => item.appointmentState.appointmentStateName == 'In Review',
      )
    : []
  const inProgressData = appointmentData
    ? appointmentData.filter(
        item => item.appointmentState.appointmentStateName == 'In Progress',
      )
    : []

  useEffect(() => {
    switch (currentTab) {
      case 'inReview':
        setTabData(inReviewData)
        break
      case 'inProgress':
        setTabData(inProgressData)
        break
      case 'today':
        setTabData(todayData)
        break
      case 'tomorrow':
        setTabData(tomorrowData)
        break
    }
  }, [appointmentData, currentTab])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  const counts = {
    today: todayData.length,
    tomorrow: tomorrowData.length,
    inReview: inReviewData.length,
    inProgress: inProgressData.length,
  }

  const handleTabChange = (tab: TabNames) => {
    setCurrentTab(tab)
    switch (tab) {
      case 'inReview':
        setTabData(inReviewData)
        break
      case 'inProgress':
        setTabData(inProgressData)
        break
      case 'today':
        setTabData(todayData)
        break
      case 'tomorrow':
        setTabData(tomorrowData)
        break
    }
  }

  const handleSearch = (searchTerm: string) => {
    setSearchQuery(searchTerm.toLowerCase())
  }

  const filteredData = tabData.filter(item => {
    const patientNameMatch = item.patientName
      .toLowerCase()
      .includes(searchQuery)
    const reasonMatch = item.reason.toLowerCase().includes(searchQuery)
    return patientNameMatch || reasonMatch
  })

  const handleStartResumeClick = async (
    patientType: string,
    patientName: string,
    currentTime: string,
    reasonForVisit: string,
    appointmentId: string,
  ) => {
    const { tokens } = await fetchAuthSession()
    const idToken = (tokens?.idToken as JWT).toString()
    const physicianId = tokens?.idToken?.payload['custom:physician_id']

    navigate('/recording', {
      state: {
        patientType,
        patientName,
        currentTime,
        reasonForVisit,
        appointmentId,
        idToken,
        physicianId,
        isNewAppointment: currentTab === 'today' || currentTab === 'tomorrow',
      },
    })
  }

  const handleSummaryClick = async (appointmentId: string) => {
    const { tokens } = await fetchAuthSession()
    const idToken = (tokens?.idToken as JWT).toString()
    navigate(`/summary?appointmentId=${appointmentId}`, {
      state: {
        idToken,
      },
    })
  }

  const columns = 3

  return (
    <Flex h="100vh" overflow="hidden">
      <SidePanel onTabChange={handleTabChange} counts={counts} />
      <Flex flex="1" direction="column" overflow="hidden">
        <Header currentCount={counts[currentTab]} onSearch={handleSearch} />
        <Box flex="1" p="4" overflowY="auto" bgColor="#F5F5F7">
          <Grid
            templateColumns={`repeat(${columns}, 1fr)`}
            gap={6}
            p={4}
            w="100%"
          >
            {filteredData.map((data, index) => (
              <GridItem key={index}>
                <Card
                  header={
                    <>
                      <Text fontSize="sm" color="gray.500">
                        {data.patientType}
                      </Text>
                      <Text
                        fontSize="sm"
                        color="#424242"
                        bg="#DFE2E6"
                        px={2}
                        py={1}
                        borderRadius="md"
                      >
                        {formatTime(data.scheduledAt.toString())}
                      </Text>
                    </>
                  }
                >
                  <Text as="b" fontSize="lg">
                    {data.patientName}
                  </Text>
                  <Text fontSize="md" mb={4}>
                    {data.reason}
                  </Text>
                  <Button
                    borderRadius="full"
                    colorScheme="blue"
                    width="50%"
                    onClick={() => {
                      if (
                        currentTab == 'today' ||
                        currentTab == 'tomorrow' ||
                        currentTab == 'inProgress'
                      ) {
                        handleStartResumeClick(
                          data.patientType,
                          data.patientName,
                          data.scheduledAt.toString(),
                          data.reason,
                          data.appointmentId.toString(),
                        )
                      } else {
                        handleSummaryClick(data.appointmentId.toString())
                      }
                    }}
                  >
                    {currentTab === 'today' || currentTab === 'tomorrow'
                      ? 'Start'
                      : currentTab === 'inProgress'
                        ? 'Resume'
                        : currentTab === 'inReview'
                          ? 'Review'
                          : ''}
                  </Button>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Home
