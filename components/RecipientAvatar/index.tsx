import { useRecipient } from '@/hooks'
import { Avatar } from '@mui/material'
import React from 'react'

type Props = ReturnType<typeof useRecipient>

function RecipientAvatar({ recipient, recipientEmail }: Props) {
  return recipient?.photoURL ? <Avatar src={recipient.photoURL} /> : <Avatar>{recipientEmail && recipientEmail[0].toUpperCase()}</Avatar>
}

export default RecipientAvatar
