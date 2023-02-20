/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from '@/config/firebase'
import WhatsAppLogo from '@/assets/images/whatsappLogo.png'
import { StyledContainer, StyledImageWrapper, StyledLoginContainer } from './styled'

function Login() {
  const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth)

  const signIn = () => {
    signInWithGoogle()
  }

  return (
    <StyledContainer>
      <Head>
        <title>Login</title>
      </Head>

      <StyledLoginContainer>
        <StyledImageWrapper>
          <Image src={WhatsAppLogo} alt="Whatsapp Logo" height={200} width={200} />
        </StyledImageWrapper>

        <Button variant="outlined" onClick={signIn}>Sign in with Google</Button>
      </StyledLoginContainer>
    </StyledContainer>
  )
}

export default Login
