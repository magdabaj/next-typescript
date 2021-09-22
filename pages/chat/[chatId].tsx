import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import '@tensorflow/tfjs'
import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
} from '@material-ui/core'
import BottomAppBar from '../../components/chat/bottomAppBar'
import styled from 'styled-components'
import { paletteColorDark } from '../../theme'
import ChatForm from '../../components/chat/chatForm'
import { UseContacts, UseMessages } from '../../context/message-context'
import { ContactsContainer } from './index'

// type PageProps = {}

export const Container = styled(Grid)`
  padding: 4 * 8px;
  justify-content: center;
  align-items: center;
  height: auto;
`

export const MessagesContainer = styled(Grid)`
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
const ContactMessageWrapper = styled(UserMessageWrapper)`
  margin-left: auto;
  margin-right: 0;
`
const Chat: NextPage = ({}) => {
  const messages = UseMessages()
  const contacts = UseContacts()

  console.log('message context', messages)
  return (
    <Container container direction="row" spacing={1}>
      <ContactsContainer container item direction="column" lg={3}>
        <Paper>
          <List>
            {contacts.map((contact) => (
              <React.Fragment key={contact.userId}>
                <ListSubheader>{contact.email}</ListSubheader>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar
                      alt={'Profile picture'}
                      src={
                        '../../images/profilePhotos/panpipe-6380762_1920.jpg'
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
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
