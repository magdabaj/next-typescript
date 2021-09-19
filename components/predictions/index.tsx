import { Prediction } from '../../model/Prediction'
import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import styled from 'styled-components'
import Dialog from '../dialog'
import Button from '../button'
import { paletteColorDark } from '../../theme'

type Props = {
  predictions: Prediction[]
  open: boolean
  onClose: () => void
}

const PredictionWrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
`

const StyledPrediction = styled.div`
  padding: 8px;
`

const Container = styled.div`
  padding: 16px;
`

const ButtonContainer = styled(Grid)`
  margin: 16px;
`

type FinalPrediction = { [label: string]: boolean }

const Predictions = ({ predictions, open, onClose }: Props) => {
  const finalPredictions = predictions.reduce(
    (acc: FinalPrediction[], prediction) => {
      prediction.results.forEach((result) => {
        if (result.match) acc = [...acc, { [prediction.label]: result.match }]
      })
      return acc
    },
    []
  )
  console.log('sorted prediction', finalPredictions)

  useEffect(() => {
    if (finalPredictions.length) onClose()
    console.log('Prediction')
  }, [])

  console.log('predictions ', predictions)
  console.log('sorted prediction', finalPredictions)
  console.log('is harmful', open)
  return (
    <Container>
      <ButtonContainer
        container
        item
        justifyContent={'center'}
        alignItems="center"
        lg={3}
      >
        <Button
          backgroundcolor={paletteColorDark.secondary}
          textcolor={paletteColorDark.text}
          onClick={onClose}
        >
          Click to see if your message was harmful
        </Button>
      </ButtonContainer>

      <Dialog open={open} onClose={onClose}>
        {finalPredictions.length &&
          finalPredictions.map((prediction) =>
            Object.entries(prediction).map((key, index) => (
              <Grid container direction={'row'} key={index}>
                <PredictionWrapper>
                  <StyledPrediction>{key}:</StyledPrediction>
                  <StyledPrediction>true</StyledPrediction>
                </PredictionWrapper>
              </Grid>
            ))
          )}
      </Dialog>
    </Container>
  )
}

export default Predictions
