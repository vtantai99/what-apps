/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'
import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip
} from '@mui/material'
import {
  MoreVertOutlined, Chat, Search, Logout
} from '@mui/icons-material'
import { signOut } from 'firebase/auth'
import { auth, db } from '@/config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import * as EmailValidator from 'email-validator'
import {
  addDoc, collection, query, where
} from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Conversation } from '@/types'
import {
  StyledAvatar, StyledContainer, StyledHeader, StyledHeaderPersonal, StyledSearch, StyledSearchInput, StyledSidebarButton
} from './styled'
import ConversationSelect from '../ConversationSelect'

function Sidebar() {
  const [loggedInUser] = useAuthState(auth)

  const [isOpenNewConversationDialog, setIsOpenNewConversationDialog] = useState(false)
  const [recipientEmail, setRecipientEmail] = useState('')

  const isInvitingSelf = recipientEmail === loggedInUser?.email

  // check if conversation already exists between the current logged in user and recipient
  const queryGetConversationsForCurrentUser = query(collection(db, 'conversations'), where('users', 'array-contains', loggedInUser?.email))
  const [conversationsSnapshot] = useCollection(queryGetConversationsForCurrentUser)

  const isConversationAlreadyExist = (email: string) => conversationsSnapshot?.docs
    .find((conversation) => (conversation.data() as Conversation).users.includes(email))

  const toggleNewConversationDialog = (isOpen: boolean) => {
    setIsOpenNewConversationDialog(isOpen)

    if (!isOpen) {
      setRecipientEmail('')
    }
  }

  const createConversation = async () => {
    if (EmailValidator.validate(recipientEmail) && !isInvitingSelf && !isConversationAlreadyExist(recipientEmail)) {
      // Add conversation user to db "conversations" collection
      // A conversation is between the currently logged in user and the user invited
      await addDoc(collection(db, 'conversations'), {
        users: [loggedInUser?.email, recipientEmail]
      })
    }
    toggleNewConversationDialog(false)
  }

  const logOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log('Tai Vo 🚀 ~ error:', error)
    }
  }

  const renderConversations = useMemo(() => conversationsSnapshot?.docs.map((conversation) => (
    <ConversationSelect
      key={conversation.id}
      id={conversation.id}
      conversationUsers={(conversation.data() as Conversation).users}
    />
  )), [conversationsSnapshot])
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledHeaderPersonal>
          <Tooltip title={loggedInUser?.email} placement="right">
            <StyledAvatar src={loggedInUser?.photoURL || ''} />
          </Tooltip>
          <div>
            <IconButton>
              <Chat />
            </IconButton>
            <IconButton>
              <MoreVertOutlined />
            </IconButton>
            <IconButton onClick={logOut}>
              <Logout />
            </IconButton>
          </div>
        </StyledHeaderPersonal>
        <StyledSidebarButton onClick={() => toggleNewConversationDialog(true)}>Start your conservation</StyledSidebarButton>
      </StyledHeader>

      {/* TODO: Search conversations */}
      {/* <StyledSearch>
        <Search color="info" />
        <StyledSearchInput placeholder="Search in your conservation" />
      </StyledSearch> */}

      {/* List of conversations */}
      {renderConversations}
      <Dialog open={isOpenNewConversationDialog} onClose={() => toggleNewConversationDialog(false)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a Google email address for the user for you wish to chat with
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleNewConversationDialog(false)}>Cancel</Button>
          <Button disabled={!recipientEmail} onClick={createConversation}>Create</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  )
}

export default Sidebar
