import React from "react";
import { Grid } from '@material-ui/core'
import Header from './header'

const Layout: React.FC = ({children} ) => {
  return <>
      <Header/>
      <main>
        <Grid container justifyContent={'center'} alignItems="center">
          {children}
        </Grid>
      </main>
  </>
}

export default Layout