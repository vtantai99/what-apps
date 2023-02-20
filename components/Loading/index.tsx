import React from 'react'
import { CircularProgress } from '@mui/material'
import { StyledContainer } from './styled'

function Loading() {
  return (
    <StyledContainer>
      <CircularProgress />
    </StyledContainer>

  )
}

export default Loading
