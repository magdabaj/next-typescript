import { NextPage } from 'next'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import ChatForm from './[chatId]'
import { withTheme } from '@material-ui/styles'
import { paletteColorDark } from '../../theme'

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

const question = [
  'Which Lloyd Webber musical premiered in the US on 10th December 1993?',
]

const Chat: NextPage = () => {
  return (
    <Container container direction="row">
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
        <ChatForm questions={question} />
      </MessagesContainer>
    </Container>
  )
}

export default withTheme(Chat)
