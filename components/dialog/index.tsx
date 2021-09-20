import React from 'react'
import {
  AppBar,
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core'
import styled from 'styled-components'
import { paletteColorDark } from '../../theme'
import Button from '../button'

type Props = {
  children: React.ReactNode
  open: boolean
  onClose: () => void
}

const Container = styled(Grid)`
  padding: 16px;
`
const StyledAppBar = styled(AppBar)`
  background-color: ${paletteColorDark.secondary};
`
const Dialog: React.FC<Props> = ({ children, open, onClose }: Props) => (
  <MUIDialog open={open} onClose={onClose}>
    <StyledAppBar style={{ position: 'relative' }}>
      <Toolbar>
        <Typography style={{ flex: 1 }} variant="h6" component="div">
          Predictions about text toxicity
        </Typography>
      </Toolbar>
    </StyledAppBar>
    <Container container>
      <DialogContent>{children}</DialogContent>
    </Container>
    <DialogActions>
      <Button
        onClick={onClose}
        backgroundcolor={paletteColorDark.primary}
        textcolor={paletteColorDark.text}
        type={'button'}
      >
        Cancel
      </Button>
    </DialogActions>
  </MUIDialog>
)

export default Dialog
