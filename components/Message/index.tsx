import { auth } from '@/config/firebase'
import { IMessage } from '@/types'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { StyledReceiverMessage, StyledSenderMessage, StyledTimeStamp } from './styled'

interface Props {
  message: IMessage
}

function Message({ message }: Props) {
  const [loggedUser] = useAuthState(auth)

  const MessageType = loggedUser?.email === message.user ? StyledSenderMessage : StyledReceiverMessage

  return (
    <MessageType>
      {message.text}
      <StyledTimeStamp>{message.sent_at}</StyledTimeStamp>
    </MessageType>
  )
}

export default Message
