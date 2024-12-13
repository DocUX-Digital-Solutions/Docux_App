import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export type DiagnosticCode = {
  code: string
  name: string
}

export const fetchDiagnosticCodes = async (
  searchTerm: string,
): Promise<DiagnosticCode[]> => {
  const response = await axios.get(
    'https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search',
    {
      params: {
        terms: searchTerm,
        sf: 'code,name',
        df: 'code,name',
      },
    },
  )

  const results = response.data[3] || []

  return results.map((item: [string, string]) => ({
    code: item[0],
    name: item[1],
  }))
}

export function useFetchDiagnosticCodes(searchTerm: string) {
  return useQuery({
    queryKey: ['fetchDiagnosticCodes', searchTerm],
    queryFn: () => fetchDiagnosticCodes(searchTerm),
    enabled: !!searchTerm,
    staleTime: 60 * 60 * 1000,
  })
}
