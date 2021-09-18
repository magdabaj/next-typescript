import { Prediction } from '../model/Prediction'
import React from 'react'
import { NextPage } from 'next'
import { Grid } from '@material-ui/core'

type Props = {
  predictions: Prediction[]
}

const DisplayTextToxicity: NextPage<Props> = ({predictions}) => {
  return (
    <Grid container>
      {predictions.map(prediction =>
        <div key={predictions.indexOf(prediction)}>
          {prediction.label}:
          {prediction.results.map(result => result.match ? "true" : '')}
        </div>
      )}
    </Grid>
  )
}

export default DisplayTextToxicity