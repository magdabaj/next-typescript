import React from 'react'
import {
  Dialog as MUIDialog,
  DialogActions,
  DialogContent,
  Grid,
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

const Dialog: React.FC<Props> = ({ children, open, onClose }: Props) => (
  <MUIDialog open={open} onClose={onClose}>
    <Container container>
      <DialogContent>{children}</DialogContent>
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
    </Container>
  </MUIDialog>
)

export default Dialog
