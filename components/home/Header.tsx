import React, { useState } from 'react'
import {
  Flex,
  Box,
  Input,
  InputLeftElement,
  IconButton,
  Icon,
  Text,
  InputGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { IconBell, IconUserCircle, IconSearch } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import useDocuXtoast from '../common/Toast'
import { useAuth } from '../../hooks/useAuth'

interface HeaderProps {
  currentCount: number
  onSearch: (searchTerm: string) => void
}

const Header: React.FC<HeaderProps> = ({ currentCount, onSearch }) => {
  const navigate = useNavigate()
  const showToast = useDocuXtoast()
  const { logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSignOut = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      showToast({
        title: 'Error signing out',
        description:
          'An error occurred while trying to sign out. Please try again.',
        status: 'error',
      })
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <Flex justifyContent="space-between" alignItems="center" bg="#F5F5F7" p={4}>
      <Box>
        <Text fontSize="md">Total: {currentCount} patients</Text>
      </Box>
      <Flex alignItems="center">
        <InputGroup>
          <InputLeftElement>
            <IconButton
              aria-label="Search"
              icon={<Icon as={IconSearch} boxSize={6} />}
              variant="ghost"
            />
          </InputLeftElement>
          <Input
            bg="white"
            placeholder="Search"
            mr={4}
            borderRadius="full"
            width="350px"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </InputGroup>
        <IconButton
          aria-label="Notifications"
          icon={<Icon as={IconBell} boxSize={6} />}
          mr={4}
          variant="ghost"
        />
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Profile"
            icon={<Icon as={IconUserCircle} boxSize={6} />}
            variant="ghost"
          />
          <MenuList>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default Header
