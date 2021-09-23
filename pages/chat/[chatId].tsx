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
  height: 100vh;
`

export const MessagesContainer = styled(Grid)``

const Contact = styled.div``

const Wrapper = styled(Paper)`
  height: 100vh;
`
const Message = styled.div`
  background-color: ${paletteColorDark.secondary};
  color: ${paletteColorDark.text};
  border-radius: 50px;
  padding: 8px;
  line-height: 2px;
  display: inline-block;
`

const UserMessageWrapper = styled.div`
  padding-bottom: 16px;
`
const ContactMessageWrapper = styled(UserMessageWrapper)`
  margin-left: auto;
  margin-right: 0;
`

const MessageDate = styled(ListSubheader)`
  font-size: x-small;
  line-height: 10px;
`
const ChatSinglePage: NextPage = ({}) => {
  const messages = UseMessages()
  const contacts = UseContacts()

  console.log('message context', messages)
  return (
    <Container container direction="row">
      <ContactsContainer
        component={Grid}
        // @ts-ignore
        container
        item
        direction="column"
        lg={4}
        display={{ sm: 'none', md: 'none' }}
      >
        <Wrapper>
          <List>
            {contacts.map((contact) => (
              <Contact key={contact.userId}>
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
              </Contact>
            ))}
          </List>
        </Wrapper>
      </ContactsContainer>
      <MessagesContainer container item direction="column" lg={8} md={12}>
        <Wrapper>
          <List>
            {messages.map((message) =>
              message.fromMe ? (
                <UserMessageWrapper key={message.id}>
                  <MessageDate>{message.date.getDate()}</MessageDate>

                  <Message>
                    <ListItem>
                      {message.body}
                      <ListItemText />
                    </ListItem>
                  </Message>
                </UserMessageWrapper>
              ) : (
                <ContactMessageWrapper key={message.id}>
                  <MessageDate>{message.date.getDate()}</MessageDate>

                  <Message>
                    <ListItem>
                      {message.body}
                      <ListItemText />
                    </ListItem>
                  </Message>
                </ContactMessageWrapper>
              )
            )}
          </List>
        </Wrapper>
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

export default ChatSinglePage
