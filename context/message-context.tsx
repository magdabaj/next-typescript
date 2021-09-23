import { Message } from '../model/Message'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Contact } from '../model/Contact'

type MessageContext = {
  messages: Message[]
  contacts: Contact[]
  addMessage(message: Message): void
  deleteMessage(messageId: number): void
}

const initialContext: {
  messages: Message[]
  contacts: Contact[]
  deleteMessage(messageId: number): void
  addMessage(message: Message): void
} = {
  messages: [],
  contacts: [],
  addMessage() {
    throw Error('No Provider!')
  },
  deleteMessage() {
    throw Error('No Provider!')
  },
}

export const MessageContext = createContext(initialContext)

export const UseMessages = () => {
  const { messages } = useContext(MessageContext)
  return messages
}

export const UseContacts = () => {
  const { contacts } = useContext(MessageContext)
  return contacts
}

const mockedContacts: Contact[] = [
  {
    userId: 1,
    email: 'magdabaj7@gmail.com',
  },
  {
    userId: 2,
    email: 'magda@gmail.com',
  },
]

const mockedMessages: Message[] = [
  {
    id: 1,
    body: 'hi',
    userId: 1,
    senderName: 'magda',
    fromMe: true,
    chatId: 1,
    author: 'magdabaj@protonmail.com',
    date: new Date(2021, 9, 23),
  },
  {
    id: 2,
    body: 'hi',
    userId: 1,
    senderName: 'magda2',
    fromMe: false,
    chatId: 1,
    author: 'magdabaj7@gmail.com',
    date: new Date(2021, 9, 23),
  },
]
type ProviderProps = { children: React.ReactNode }
export const MessageProvider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageContext['messages'] | []>([])
  const [contacts, setContacts] = useState<MessageContext['contacts'] | []>([])

  useEffect(() => {
    setMessages(mockedMessages)
    setContacts(mockedContacts)
  }, [mockedMessages, mockedContacts])

  const addMessage = (message: Message) => setMessages([...messages, message])
  const deleteMessage = (messageId: number) =>
    setMessages(messages.filter((message) => message.id === messageId))

  return (
    <MessageContext.Provider
      value={{
        messages,
        contacts,
        addMessage,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
