import React, { useContext } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import '@tensorflow/tfjs'
import { Box, Grid } from '@material-ui/core'
import BottomAppBar from '../../components/chat/bottomAppBar'
import styled from 'styled-components'
import { paletteColorDark } from '../../theme'
import ChatForm from '../../components/chat/chatForm'
import { MessageContext } from '../../context/message-context'

// type PageProps = {}

const Container = styled(Grid)`
  padding: 4 * 8px;
  justify-content: center;
  align-items: center;
  height: auto;
`

const ContactsContainer = styled(Grid)`
  padding: 8px;
`
const MessagesContainer = styled(Grid)`
  padding: 8px;
`

const Contact = styled.div`
  min-width: 80px;
  min-height: 40px;
  background-color: bisque;
`

const ContactWrapper = styled.div`
  padding-bottom: 16px;
`
const Message = styled.div`
  background-color: ${paletteColorDark.secondary};
  color: ${paletteColorDark.text};
  border-radius: 50px;
  padding: 12px;
  display: inline-block;
`

const UserMessageWrapper = styled.div`
  padding-bottom: 16px;
`
const ContactMessageWrapper = styled.div`
  padding-bottom: 16px;
  margin-left: auto;
  margin-right: 0;
`
const Chat: NextPage = ({}) => {
  const messageContext = useContext(MessageContext)
  const messages = messageContext.getMessages()
  console.log('message context', messages)
  return (
    <Container container direction="row" spacing={1}>
      <ContactsContainer container item direction="column" lg={3}>
        <ContactWrapper>
          <Contact>User 1</Contact>
        </ContactWrapper>
        <ContactWrapper>
          <Contact>User 2</Contact>
        </ContactWrapper>
      </ContactsContainer>
      <MessagesContainer container item direction="column" lg={9}>
        {messages.map((message) =>
          message.fromMe ? (
            <UserMessageWrapper key={message.id}>
              <Message>{message.body}</Message>
            </UserMessageWrapper>
          ) : (
            <ContactMessageWrapper key={message.id}>
              {' '}
              <Message>{message.body}</Message>
            </ContactMessageWrapper>
          )
        )}
        <ChatForm />
      </MessagesContainer>
      <Grid
        component={Box}
        item
        xs={12}
        display={{ xs: 'block', mdUp: 'none' }}
      >
        <BottomAppBar />
      </Grid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`http://localhost:3000/api/questions`)
  const { Data } = await response.json()
  const questions = Data.map(
    (question: { Question: string }) => question.Question
  )
  return {
    props: {
      questions,
    },
  }
}

export default Chat
