import { Button } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { StyledContainer, StyledImageWrapper, StyledLoginContainer } from './styled'
import WhatsAppLogo from '../../assets/images/whatsappLogo.png'

function Login() {
  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>

      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image src={WhatsAppLogo} alt="Whatsapp Logo" height={200} width={200} />
        </StyledImageWrapper>

        <Button variant="outlined">Sign in with Google</Button>
      </StyledLoginContainer>
    </StyledContainer>
  )
}

export default Login
