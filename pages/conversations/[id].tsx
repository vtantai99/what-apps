import { Sidebar } from '@/components'
import ConversationScreen from '@/components/ConversationScreen'
import { auth, db } from '@/config/firebase'
import { Conversation as ConversationType, IMessage } from '@/types'
import { generateQueryGetMessages, getRecipientEmail, transformMessage } from '@/utils'
import { doc, getDoc, getDocs } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyledContainer, StyledConversationContainer } from './styled'

interface Props {
  conversation: ConversationType,
  messages: IMessage[]
}

function Conversation({ conversation, messages }: Props) {
  const [loggedInUser] = useAuthState(auth)

  return (
    <StyledContainer>
      <Head>
        <title>
          Conversation with
          {' '}
          {getRecipientEmail(conversation.users, loggedInUser)}
        </title>
      </Head>

      <Sidebar />
      <StyledConversationContainer>
        <ConversationScreen conversation={conversation} messages={messages} />
      </StyledConversationContainer>
    </StyledContainer>
  )
}

export default Conversation

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (context) => {
  const conversationId = context.params?.id

  // Get conversation to know who we are chatting with
  const conversationRef = doc(db, 'conversations', conversationId as string)
  const conversationSnapshot = await getDoc(conversationRef)

  // Get all messages between logged in user and recipient in this conversation
  const queryMessages = generateQueryGetMessages(conversationId)
  const messagesSnapshot = await getDocs(queryMessages)
  const messages = messagesSnapshot.docs.map((messageDoc) => transformMessage(messageDoc))

  return {
    props: {
      conversation: conversationSnapshot.data() as ConversationType,
      messages
    }
  }
}
