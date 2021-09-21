import { Message } from '../model/Message'
import React, { createContext, useEffect, useState } from 'react'

type MessageContext = {
  messages: Message[]
  addMessage(message: Message): void
  deleteMessage(messageId: number): void
  getMessages(): Message[]
}

const initialContext: {
  messages: Message[]
  deleteMessage(messageId: number): void
  addMessage(message: Message): void
  getMessages(): Message[]
} = {
  messages: [],
  addMessage() {
    throw Error('No Provider!')
  },
  deleteMessage() {
    throw Error('No Provider!')
  },
  getMessages() {
    throw Error('No Provider!')
  },
}

export const MessageContext = createContext(initialContext)

const mockedMessages: Message[] = [
  {
    id: 1,
    body: 'hi',
    userId: 1,
    senderName: 'magda',
    fromMe: true,
    chatId: 1,
    author: 'magdabaj@protonmail.com',
    date: new Date(),
  },
  {
    id: 2,
    body: 'hi',
    userId: 1,
    senderName: 'magda2',
    fromMe: false,
    chatId: 1,
    author: 'magdabaj7@gmail.com',
    date: new Date(),
  },
]
type ProviderProps = { children: React.ReactNode }
export const MessageProvider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageContext['messages'] | []>([])

  useEffect(() => {
    setMessages(mockedMessages)
  }, [mockedMessages])

  const addMessage = (message: Message) => setMessages([...messages, message])
  const deleteMessage = (messageId: number) =>
    setMessages(messages.filter((message) => message.id === messageId))
  const getMessages = () => messages

  return (
    <MessageContext.Provider
      value={{
        messages,
        addMessage,
        deleteMessage,
        getMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
