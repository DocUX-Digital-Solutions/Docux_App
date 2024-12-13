import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { IconLoader } from '@tabler/icons-react'

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`

const SpinnerIcon = styled(IconLoader)`
  animation: ${spin} 1s linear infinite;
`

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <SpinnerIcon size={48} />
    </SpinnerContainer>
  )
}

export default LoadingSpinner
