import { NextPage } from 'next'
import { UseContacts } from '../../context/message-context'
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
} from '@material-ui/core'
import BottomAppBar from '../../components/chat/bottomAppBar'
import React from 'react'
import { Container, MessagesContainer } from './[chatId]'
import styled from 'styled-components'

export const ContactsContainer = styled(Grid)`
  padding: 8px;
`

const Chat: NextPage = () => {
  const contacts = UseContacts()
  return (
    <Container container direction="row" spacing={1}>
      <Paper>
        <List>
          {contacts.map((contact) => (
            <React.Fragment key={contact.userId}>
              <ListSubheader>{contact.email}</ListSubheader>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar
                    alt={'Profile picture'}
                    src={'../../images/profilePhotos/panpipe-6380762_1920.jpg'}
                  />
                </ListItemAvatar>
                <ListItemText />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      {/*<ContactsContainer container item direction="column" lg={3}>*/}
      {/*  <ContactWrapper>*/}
      {/*    <Contact>User 1</Contact>*/}
      {/*  </ContactWrapper>*/}
      {/*  <ContactWrapper>*/}
      {/*    <Contact>User 2</Contact>*/}
      {/*  </ContactWrapper>*/}
      {/*</ContactsContainer>*/}
      <MessagesContainer container item direction="column" lg={9}>
        Chose contact to write a message to
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

export default Chat
