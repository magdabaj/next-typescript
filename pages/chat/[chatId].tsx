import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import '@tensorflow/tfjs'
import { Box, Grid } from '@material-ui/core'
import BottomAppBar from '../../components/chat/bottomAppBar'
import styled from 'styled-components'
import { paletteColorDark } from '../../theme'
import ChatForm from '../../components/chat/chatForm'

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

const MessageWrapper = styled.div`
  padding-bottom: 16px;
`
const Chat: NextPage = ({}) => {
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
        <MessageWrapper>
          <Message>message 1</Message>
        </MessageWrapper>
        <MessageWrapper>
          <Message>message 2</Message>
        </MessageWrapper>
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
