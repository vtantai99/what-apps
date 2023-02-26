/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth, db } from '@/config/firebase'
import { useRecipient } from '@/hooks'
import { Conversation, IMessage } from '@/types'
import { convertFireStoreTimestampToString, generateQueryGetMessages, transformMessage } from '@/utils'
import { InsertEmoticon, Send } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import {
  addDoc,
  collection, doc, serverTimestamp, setDoc
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useMemo, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from '../Message'
import RecipientAvatar from '../RecipientAvatar'
import {
  EndOfMessageForAutoScroll,
  StyledH3, StyledHeaderInfo, StyledInput, StyledInputContainer, StyledMessageContainer, StyledRecipientHeader
} from './styled'

interface Props {
  conversation: Conversation
  messages: IMessage[]
}

function ConversationScreen({ conversation, messages }: Props) {
  const conversationUsers = conversation.users
  const { recipientEmail, recipient } = useRecipient(conversationUsers)
  const [loggedInUser] = useAuthState(auth)

  const router = useRouter()
  const conversationId = router.query.id // localhost:3000/conversations/:id

  const endOfMessageRef = useRef<HTMLDivElement>(null)
  const [newMessage, setNewMessage] = useState('')

  // Get all messages between logged in user and recipient in this conversation
  const queryGetMessages = generateQueryGetMessages(conversationId as string)
  const [messagesSnapshot, messagesLoading] = useCollection(queryGetMessages)

  const showMessages = useMemo(() => {
    // If front-end is loading messages behind the scenes, display messages retrieved from Next SSR (pass down from [id].tsx)
    if (messagesLoading) {
      return messages.map((message) => <Message key={message.id} message={message} />)
    }
    // If front-end has finished loading messages, so now we have messagesSnapshot
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => <Message key={message.id} message={transformMessage(message)} />)
    }
    return null
  }, [messages, messagesLoading, messagesSnapshot])

  const scrollToBottom = () => {
    endOfMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addMessageToDbAndUpdateLastSeen = async () => {
    // update last seen in 'users' collection
    await setDoc(
      doc(db, 'users', loggedInUser?.email as string),
      { last_seen: serverTimestamp() },
      { merge: true } // Just update what is change
    )

    // add new message to 'messages' collection
    await addDoc(collection(db, 'messages'), {
      conversation_id: conversationId,
      sent_at: serverTimestamp(),
      text: newMessage,
      user: loggedInUser?.email
    })

    // Reset input field
    setNewMessage('')

    // Scroll to bottom
    scrollToBottom()
  }

  const sendMessageOnEnter: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (!newMessage) return
      addMessageToDbAndUpdateLastSeen()
    }
  }

  const sendMessageOnClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
    event.preventDefault()
    if (!newMessage) return
    addMessageToDbAndUpdateLastSeen()
  }
  return (
    <>
      <StyledRecipientHeader>
        <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
        <StyledHeaderInfo>
          <StyledH3>{recipientEmail}</StyledH3>
          {recipient && (
          <span>
            Last active:
            {' '}
            {convertFireStoreTimestampToString(recipient.lastSeen)}
          </span>
          )}
        </StyledHeaderInfo>
      </StyledRecipientHeader>
      <StyledMessageContainer>
        {showMessages}
      </StyledMessageContainer>

      {/* For auto scroll to the end when a new message is sent */}
      <EndOfMessageForAutoScroll ref={endOfMessageRef} />
      {/* Enter new message */}
      <StyledInputContainer>
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <StyledInput value={newMessage} onChange={(event) => setNewMessage(event.target.value)} onKeyDown={sendMessageOnEnter} />
        <IconButton onClick={sendMessageOnClick} disabled={!newMessage}>
          <Send />
        </IconButton>
      </StyledInputContainer>
    </>
  )
}

export default ConversationScreen
