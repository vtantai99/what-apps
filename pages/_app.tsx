/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/config/firebase'
import { Loading } from '@/components'
import Login from './login'

export default function App({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading] = useAuthState(auth)

  if (loading) return <Loading />

  if (!loggedInUser) return <Login />

  return <Component {...pageProps} />
}
