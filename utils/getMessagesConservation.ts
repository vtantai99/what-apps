import { db } from '@/config/firebase'
import { IMessage } from '@/types'
import {
  collection, DocumentData, orderBy, query, QueryDocumentSnapshot, Timestamp, where
} from 'firebase/firestore'

export const generateQueryGetMessages = (conversationId?: string) => query(
  collection(db, 'messages'),
  where('conversation_id', '==', conversationId),
  orderBy('sent_at', 'asc')
)

export const convertFireStoreTimestampToString = (timestamp: Timestamp) => new Date(timestamp.toDate().getTime()).toLocaleString()

export const transformMessage = (messages: QueryDocumentSnapshot<DocumentData>) => ({
  id: messages.id,
  ...messages.data(), // spread out conversation_id, text, sent_at, user
  sent_at: messages.data().sent_at ? convertFireStoreTimestampToString(messages.data().sent_at as Timestamp) : null
}) as IMessage
