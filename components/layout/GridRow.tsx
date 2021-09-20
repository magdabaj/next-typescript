import React from 'react'
import { Grid } from '@material-ui/core'

type Props = {
  children: React.ReactNode
  direction?: 'row' | 'column'
}

const GridRow: React.FC<Props> = ({ children, direction, ...rest }) => (
  <Grid
    justifyContent={'center'}
    container
    item
    direction={direction}
    {...rest}
  >
    {children}
  </Grid>
)

export default GridRow
