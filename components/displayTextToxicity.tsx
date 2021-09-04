import { Prediction } from '../model/Prediction'
import React from 'react'
import { NextPage } from 'next'

type Props = {
  predictions: Prediction[]
}

const DisplayTextToxicity: NextPage<Props> = ({predictions}) => {
  return (
    <div>
      {predictions.map(prediction =>
        <div>{prediction.label}:  {prediction.results.map(result => result.match ? "true" : '')}</div>
      )}
    </div>
  )
}

export default DisplayTextToxicity