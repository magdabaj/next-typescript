import React from 'react'
import { Grid } from '@material-ui/core'
import Header from './header'
import styled from 'styled-components'

const Container = styled(Grid)`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <Container container spacing={0}>
          {children}
        </Container>
      </main>
    </>
  )
}

export default Layout
