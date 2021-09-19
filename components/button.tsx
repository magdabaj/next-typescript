import React, { FormEvent } from 'react'
import { Button as MUIButton, ButtonProps } from '@material-ui/core'
import styled, { css } from 'styled-components'

type Props = {
  textcolor: string
  backgroundcolor: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onSubmit?: (event: FormEvent) => Promise<void>
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  height?: string
}

type StyledButtonProps = ButtonProps & {
  textcolor: string
  backgroundcolor: string
  height?: string
}

const StyledButton = styled(MUIButton)`
  color: ${(props: StyledButtonProps) => props.textcolor};
  background-color: ${(props: StyledButtonProps) => props.backgroundcolor};
  box-sizing: border-box;
  text-align: center;
  margin: 0;
  width: 100%;
  padding: 0;
  //height: //44px !important;
  overflow: hidden;
  ${(props: StyledButtonProps) =>
    props.height &&
    css`
      height: ${props.height};
    `};
` as React.ComponentType<StyledButtonProps>

const Button: React.FC<Props> = ({
  children,
  textcolor,
  backgroundcolor,
  type,
  onSubmit,
  height,
  onClick,
}: Props) => {
  return (
    <StyledButton
      type={type}
      textcolor={textcolor}
      backgroundcolor={backgroundcolor}
      onSubmit={onSubmit}
      height={height}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}

export default Button
