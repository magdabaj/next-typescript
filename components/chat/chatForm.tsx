import React, { FormEvent, useEffect, useState } from 'react'
import { Prediction } from '../../model/Prediction'
import { getPredictions } from '../../helpers/getPredictions'
import { Grid, TextField } from '@material-ui/core'
import Button from '../button'
import { paletteColorDark } from '../../theme'
import Predictions from '../predictions'
import GridRow from '../layout/GridRow'

const ChatForm: React.FC = () => {
  const [open, setOpen] = useState(false)

  const [question, setQuestion] = useState<string>('')
  const [predictions, setPredictions] = useState<Prediction[] | undefined>(
    undefined
  )
  const [loading, setLoading] = useState<boolean>(false)

  const handleClose = () => setOpen(!open)

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true)
    event.preventDefault()

    const modelPredictions = await getPredictions(question)
    setPredictions(modelPredictions)
    setLoading(false)

    console.log('predictions: ', predictions)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
  }

  useEffect(() => {
    if (predictions?.length) setLoading(false)
  }, [predictions])
  return (
    <>
      <form onSubmit={handleSubmit}>
        <GridRow direction="row">
          <Grid container item lg={10}>
            <TextField
              label={'Ask me question'}
              type="text"
              id={'question'}
              onChange={handleChange}
              value={question}
            />
          </Grid>

          <Grid container item lg={2}>
            <Button
              textcolor={paletteColorDark.text}
              backgroundcolor={paletteColorDark.primary}
              type="submit"
              onSubmit={handleSubmit}
            >
              Send
            </Button>
          </Grid>
        </GridRow>
      </form>

      {!loading && predictions && (
        <Predictions
          predictions={predictions}
          open={open}
          onClose={handleClose}
        />
      )}
      {loading && <div>Loading ...</div>}
    </>
  )
}

export default ChatForm
