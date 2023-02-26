import { auth, db } from '@/config/firebase'
import { AppUser, Conversation } from '@/types'
import { getRecipientEmail } from '@/utils'
import { collection, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

export const useRecipient = (conversationUsers: Conversation['users']) => {
  const [loggedInUser] = useAuthState(auth)

  // Get recipient email
  const recipientEmail = getRecipientEmail(conversationUsers, loggedInUser)

  // Get recipient
  const queryGetRecipient = query(collection(db, 'users'), where('email', '==', recipientEmail))
  const [recipientsSnapshot] = useCollection(queryGetRecipient)
  // recipientsSnapshot?.doc could be an empty array, leading to docs[0] be "undefined"
  // so we have to force "?" after docs[0] because there is no data() on "undefined"
  const recipient = recipientsSnapshot?.docs[0]?.data() as AppUser | undefined

  return { recipientEmail, recipient }
}
