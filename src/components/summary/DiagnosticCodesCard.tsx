import { Box, Input, Flex, Text, Button, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  DiagnosticCode,
  useFetchDiagnosticCodes,
} from '../../hooks/useFetchDiagnosticCodes'
import { useFormContext } from 'react-hook-form'
import { PatchAppointmentRequest } from '../../hooks/useFetchAppointmentData'

const DiagnosticCodesCard: React.FC<{
  suggested: string[]
  isEditing: boolean
}> = ({ suggested, isEditing }) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500) // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler)
    }
  }, [query])

  const { data: searchResults = [], isLoading } =
    useFetchDiagnosticCodes(debouncedQuery)

  const { getValues, setValue } = useFormContext<PatchAppointmentRequest>()
  const diagnosticCodes = getValues('diagnosticCodes') || []

  const handleAddCode = (code: string, name: string) => {
    const codeWithName = `${code} - ${name}`
    if (!diagnosticCodes.includes(codeWithName)) {
      setValue('diagnosticCodes', [...diagnosticCodes, codeWithName], {
        shouldDirty: true,
        shouldValidate: true,
      })
    }
    setIsDropdownVisible(false)
    setQuery('')
  }

  const handleRemoveCode = (codeWithName: string) => {
    setValue(
      'diagnosticCodes',
      diagnosticCodes.filter(item => item !== codeWithName),
      { shouldDirty: true, shouldValidate: true },
    )
  }

  const handleInputFocus = () => {
    if (query) {
      setIsDropdownVisible(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsDropdownVisible(true)
  }

  const handleInputBlur = () => {
    // Delay hiding dropdown to allow item selection
    setTimeout(() => {
      setIsDropdownVisible(false)
    }, 200)
  }

  const renderCodeItem = (item: string, showRemoveButton: boolean = false) => {
    const [code, ...descriptionParts] = item.split(' - ')
    const description = descriptionParts.join(' - ').trim()

    return (
      <Box key={item} width="100%">
        <Divider borderColor="gray.300" />
        <Flex align="center" mb={1} p={2}>
          <Text fontSize="sm" fontWeight="bold" minWidth="80px">
            {code.trim()}
          </Text>
          <Text fontSize="sm" flex="1" ml={2}>
            {description}
          </Text>
          {showRemoveButton && isEditing && (
            <Button size="sm" onClick={() => handleRemoveCode(item)} ml="auto">
              Remove
            </Button>
          )}
        </Flex>
      </Box>
    )
  }

  return (
    <Box
      bg="white"
      p={4}
      shadow="md"
      borderWidth="2px"
      borderRadius="lg"
      flex="1"
      minHeight="100%"
      backgroundColor="#FFFDF0"
    >
      {/* Header and Search Input */}
      <Flex
        align="flex-start"
        direction="column"
        justifyContent="space-between"
        mb={4}
      >
        <Text fontWeight="bold" color="rgb(52,106,172)">
          DIAGNOSTIC CODES
        </Text>
        {isEditing && (
          <Box position="relative" width="100%">
            <Input
              backgroundColor="white"
              placeholder="Search for code or name"
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              mt={2}
            />
            {isDropdownVisible && !isLoading && (
              <Box
                position="absolute"
                top="100%"
                left={0}
                right={0}
                bg="white"
                border="1px solid #E2E8F0"
                borderRadius="md"
                mt={1}
                maxHeight="200px"
                overflowY="auto"
                zIndex={1}
                boxShadow="lg"
              >
                {searchResults.length > 0 ? (
                  searchResults.map((item: DiagnosticCode, index: number) => (
                    <Box key={`search-${index}`}>
                      <Flex
                        align="center"
                        p={2}
                        _hover={{ backgroundColor: 'gray.100' }}
                      >
                        <Text fontSize="sm" fontWeight="bold" minWidth="80px">
                          {item.code}
                        </Text>
                        <Text fontSize="sm" flex="1" ml={2}>
                          {item.name}
                        </Text>
                        <Button
                          size="xs"
                          colorScheme="blue"
                          onClick={() => handleAddCode(item.code, item.name)}
                          ml={2}
                        >
                          Add
                        </Button>
                      </Flex>
                      {index < searchResults.length - 1 && (
                        <Divider borderColor="gray.200" />
                      )}
                    </Box>
                  ))
                ) : (
                  <Text p={2}>No results found.</Text>
                )}
              </Box>
            )}
          </Box>
        )}
      </Flex>

      {isLoading && <Text>Loading...</Text>}

      {/* Selected Diagnostic Codes */}
      <Flex direction="column" align="flex-start" mb={4}>
        <Text fontWeight="bold" mb={2}>
          SELECTED DIAGNOSTIC CODES
        </Text>
        {diagnosticCodes.length > 0 ? (
          diagnosticCodes.map(item => renderCodeItem(item, true))
        ) : (
          <Text fontSize="sm">No diagnostic codes selected.</Text>
        )}
      </Flex>

      {/* Suggested Diagnostic Codes */}
      <Flex direction="column" align="flex-start">
        <Text fontWeight="bold" mb={2}>
          SUGGESTED DIAGNOSTIC CODES
        </Text>
        {suggested.length > 0 ? (
          suggested.map(item => renderCodeItem(item))
        ) : (
          <Text fontSize="sm">No suggested codes available.</Text>
        )}
      </Flex>
    </Box>
  )
}

export default DiagnosticCodesCard
