import { useState } from 'react'
import {
  Flex,
  Box,
  Image,
  Icon,
  IconButton,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react'
import {
  IconChevronLeft,
  IconChevronRight,
  IconCalendarWeek,
  IconCalendarEvent,
  IconCalendarExclamation,
  TablerIcon,
  IconCalendarQuestion,
} from '@tabler/icons-react'
import { TabNames } from './types'
interface HomeSidePanelProps {
  onTabChange: (tab: TabNames) => void
  counts: {
    inProgress: number
    inReview: number
    today: number
    tomorrow: number
  }
}

interface HomeSidePanelTabProps {
  icon: TablerIcon
  label: string
  count: number
  isExpanded: boolean
  onClick: () => void
}

const HomeSidePanelTab: React.FC<HomeSidePanelTabProps> = ({
  icon,
  label,
  count,
  isExpanded,
  onClick,
}) => {
  return (
    <Tab
      onClick={onClick}
      _selected={{ bg: '#334961', color: 'white' }}
      _hover={{ bg: '#334961' }}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px={4}
    >
      {isExpanded ? (
        <>
          <Flex alignItems="center">
            <Icon as={icon} mr={4} boxSize={6} mb={2} />
            {label}
          </Flex>
          <Box ml={4}>{count}</Box>
        </>
      ) : (
        <>
          <Flex direction="column">
            <Icon as={icon} boxSize={6} mb={2} />
            {label}: {count}
          </Flex>
        </>
      )}
    </Tab>
  )
}

const HomeSidePanel: React.FC<HomeSidePanelProps> = ({
  onTabChange,
  counts,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box
      w={isExpanded ? '250px' : '185px'}
      minW={isExpanded ? '250px' : '185x'}
      maxW={isExpanded ? '250px' : '185px'}
      p="5"
      color="white"
      bg="#0A1827"
      transition="width 0.3s, min-width 0.3s, max-width 0.3s"
      display="flex"
      flexDirection="column"
    >
      <Flex>
        <Image
          src={
            isExpanded
              ? '/assets/images/logo-sidepanel.svg'
              : '/assets/images/logo-mini.svg'
          }
          alt="Docux Logo"
          mb={20}
          mr={isExpanded ? 5 : 0}
        />
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isExpanded ? <IconChevronLeft /> : <IconChevronRight />}
          onClick={toggleSidebar}
          variant="outline"
          colorScheme="whiteAlpha"
          border="none"
          mt={4}
          ml="auto"
        />
      </Flex>
      <Tabs orientation="vertical" variant="unstyled">
        <TabList>
          <Flex direction="column" gap="1em">
            <HomeSidePanelTab
              icon={IconCalendarEvent}
              label="Today"
              count={counts.today}
              isExpanded={isExpanded}
              onClick={() => onTabChange('today')}
            />
            <HomeSidePanelTab
              icon={IconCalendarWeek}
              label="Tomorrow"
              count={counts.tomorrow}
              isExpanded={isExpanded}
              onClick={() => onTabChange('tomorrow')}
            />
            <HomeSidePanelTab
              icon={IconCalendarExclamation}
              label="In Progress"
              count={counts.inProgress}
              isExpanded={isExpanded}
              onClick={() => onTabChange('inProgress')}
            />
            <HomeSidePanelTab
              icon={IconCalendarQuestion}
              label="In Review"
              count={counts.inReview}
              isExpanded={isExpanded}
              onClick={() => onTabChange('inReview')}
            />
          </Flex>
        </TabList>
      </Tabs>
    </Box>
  )
}

export default HomeSidePanel
