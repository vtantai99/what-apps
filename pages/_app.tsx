/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@/config/firebase'
import { Loading } from '@/components'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import Login from './login'

export default function App({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading] = useAuthState(auth)

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', loggedInUser?.email as string),
          { email: loggedInUser?.email, lastSeen: serverTimestamp(), photoURL: loggedInUser?.photoURL },
          { merge: true } // Just update what is changed
        )
      } catch (error) {
        console.error('ERROR SETTING USER INFO IN DB', error)
      }
    }

    if (loggedInUser) {
      setUserInDb()
    }
  }, [loggedInUser])

  if (loading) return <Loading />

  if (!loggedInUser) return <Login />

  return <Component {...pageProps} />
}
