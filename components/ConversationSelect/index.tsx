/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRecipient } from '@/hooks'
import { Conversation } from '@/types'
import { useRouter } from 'next/router'
import React from 'react'
import RecipientAvatar from '../RecipientAvatar'
import { StyledContainer, StyledTitleConversation } from './styled'

interface Props {
  id: string
  conversationUsers: Conversation['users']
}

function ConversationSelect({ id, conversationUsers }: Props) {
  const { recipientEmail, recipient } = useRecipient(conversationUsers)
  const router = useRouter()

  const onSelectConversation = () => {
    router.push(`/conversations/${id}`)
  }
  return (
    <StyledContainer onClick={onSelectConversation}>
      <RecipientAvatar recipient={recipient} recipientEmail={recipientEmail} />
      <StyledTitleConversation>{recipientEmail}</StyledTitleConversation>
    </StyledContainer>
  )
}

export default ConversationSelect
