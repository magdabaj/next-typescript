import { Prediction } from '../../model/Prediction'
import React from 'react'
import { Dialog, DialogActions, DialogContent, Grid } from '@material-ui/core'
import styled from 'styled-components'
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

  // useEffect(() => {
  //   if (predictions.length) setOpen(true)
  //   console.log('Prediction')
  // }, [predictions])

  console.log('predictions ', predictions)
  console.log('sorted prediction', finalPredictions)
  console.log('is harmful', open)
  return (
    <div>
      <div onClick={onClose}>Click to see if your message was harmful</div>
      {/*<Dialog open={open} onClose={handleClose}>*/}
      {/*  <>*/}
      {/*    {finalPredictions.length &&*/}
      {/*    finalPredictions.map((prediction) =>*/}
      {/*      Object.keys(prediction).map((key, index) => (*/}
      {/*        <Grid container direction={'row'} key={index}>*/}
      {/*          <PredictionWrapper>*/}
      {/*            <StyledPrediction>{prediction.label}:</StyledPrediction>*/}
      {/*            <StyledPrediction>{prediction[key]}</StyledPrediction>*/}
      {/*          </PredictionWrapper>*/}
      {/*        </Grid>*/}
      {/*      ))*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*</Dialog>*/}

      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          {finalPredictions.map((prediction) =>
            Object.entries(prediction).map((key, index) => (
              <Grid container direction={'row'} key={index}>
                <PredictionWrapper>
                  <StyledPrediction>{key}</StyledPrediction>
                  <StyledPrediction>true</StyledPrediction>
                </PredictionWrapper>
              </Grid>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            backgroundcolor={paletteColorDark.primary}
            textcolor={paletteColorDark.text}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Predictions
