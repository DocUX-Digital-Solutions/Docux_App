import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import apiClient from '../api/axios'
import { AxiosError } from 'axios'

export type Appointment = {
  appointmentId: number
  reason: string
  patientName: string
  patientType: string
  scheduledAt: Date
  appointmentState: { appointmentStateName: string }
}

type AppointmentDetail = {
  appointmentId: number
  reason: string
  patientName: string
  patientType: string
  scheduledAt: Date
  appointmentState: { appointmentStateName: string }
  encounters: {
    suggestedBillingCodes: string[]
    suggestedDiagnosticCodes: string[]
    billingCodes: string[]
    diagnosticCodes: string[]
    audioReference: string
    transcriptionReference: string
    shardInfos: string[]
    soapNotes: {
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
  }
}

export type PatchAppointmentRequest = {
  transcriptionReference?: string
  audioReference?: string
  billingCodes?: string[]
  diagnosticCodes?: string[]
  subjectiveText?: string
  objectiveText?: string
  assessmentText?: string
  planTexts?: string[]
  reviewOfSystemsText?: string
  pastMedicalHistoryText?: string
  physicalExaminationText?: string
  pastFamilyHistoryText?: string
  pastSocialHistoryText?: string
  diagnosticTestingText?: string
  allergiesText?: string
}

const fetchAppointmentData = async (): Promise<Appointment[]> => {
  const { data } = await apiClient.get<Appointment[]>('appointments')
  console.log(data);
  return data
}

export const patchAppointment = async (
  appointmentId: string,
  patchData: PatchAppointmentRequest,
): Promise<void> => {
  await apiClient.patch(`/appointments/${appointmentId}`, patchData)
}

const fetchAppointmentDetail = async (
  id: string,
): Promise<AppointmentDetail> => {
  const { data } = await apiClient.get<AppointmentDetail>('/appointments/' + id)
  return data
}

const startAppointment = async (
  appointmentId: string,
): Promise<AppointmentDetail> => {
  const { data } = await apiClient.post<AppointmentDetail>(
    `/appointments/${appointmentId}/start`,
  )
  return data
}

const pauseAppointment = async (
  appointmentId: string,
  shardId: string,
  sequenceNum: string,
): Promise<AppointmentDetail> => {
  const { data } = await apiClient.post<AppointmentDetail>(
    `/appointments/${appointmentId}/pause`,
    {
      shardId,
      sequenceNum,
    },
  )
  return data
}

const resumeAppointment = async (
  appointmentId: string,
): Promise<AppointmentDetail> => {
  const { data } = await apiClient.post<AppointmentDetail>(
    `/appointments/${appointmentId}/resume`,
  )
  return data
}

const endAppointment = async (
  appointmentId: string,
  shardId: string,
  sequenceNum: string,
): Promise<AppointmentDetail> => {
  const { data } = await apiClient.post<AppointmentDetail>(
    `/appointments/${appointmentId}/end`,
    {
      shardId,
      sequenceNum,
    },
  )
  return data
}

const submitAppointment = async (
  appointmentId: string,
): Promise<AppointmentDetail> => {
  const { data } = await apiClient.post<AppointmentDetail>(
    `/appointments/${appointmentId}/submit`,
  )
  return data
}

export function useFetchAppointmentData() {
  return useQuery<Appointment[], Error>({
    queryKey: ['fetchAppointmentData'],
    queryFn: fetchAppointmentData,
  })
}

export function useFetchAppointmentDetail(id: string) {
  return useQuery<AppointmentDetail, Error>({
    queryKey: ['fetchAppointmentDetail', id],
    queryFn: () => fetchAppointmentDetail(id),
  })
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      appointmentId,
      patchData,
    }: {
      appointmentId: string
      patchData: PatchAppointmentRequest
    }) => patchAppointment(appointmentId, patchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentData'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentDetail'] })
    },
  })
}

export function useStartAppointment(): UseMutationResult<
  AppointmentDetail,
  AxiosError,
  string
> {
  const queryClient = useQueryClient()
  return useMutation<AppointmentDetail, AxiosError, string>({
    mutationFn: (appointmentId: string) => startAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentData'] })
    },
  })
}

export function usePauseAppointment(): UseMutationResult<
  AppointmentDetail,
  AxiosError,
  { appointmentId: string; shardId: string; sequenceNum: string }
> {
  const queryClient = useQueryClient()
  return useMutation<
    AppointmentDetail,
    AxiosError,
    { appointmentId: string; shardId: string; sequenceNum: string }
  >({
    mutationFn: ({ appointmentId, shardId, sequenceNum }) =>
      pauseAppointment(appointmentId, shardId, sequenceNum),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentData'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentDetail'] })
    },
  })
}

export function useResumeAppointment(): UseMutationResult<
  AppointmentDetail,
  AxiosError,
  string
> {
  const queryClient = useQueryClient()
  return useMutation<AppointmentDetail, AxiosError, string>({
    mutationFn: (appointmentId: string) => resumeAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentData'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentDetail'] })
    },
  })
}

export function useEndAppointment(): UseMutationResult<
  AppointmentDetail,
  AxiosError,
  { appointmentId: string; shardId: string; sequenceNum: string }
> {
  const queryClient = useQueryClient()
  return useMutation<
    AppointmentDetail,
    AxiosError,
    { appointmentId: string; shardId: string; sequenceNum: string }
  >({
    mutationFn: ({ appointmentId, shardId, sequenceNum }) =>
      endAppointment(appointmentId, shardId, sequenceNum),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentData'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentDetail'] })
    },
  })
}

export function useSubmitAppointment(): UseMutationResult<
  AppointmentDetail,
  AxiosError,
  string
> {
  const queryClient = useQueryClient()
  return useMutation<AppointmentDetail, AxiosError, string>({
    mutationFn: (appointmentId: string) => submitAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentData'] })
      queryClient.invalidateQueries({ queryKey: ['fetchAppointmentDetail'] })
    },
  })
}
