import React, { FormEvent, useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import '@tensorflow/tfjs'
import { getPredictions } from '../../helpers/getPredictions'
import { Prediction } from '../../model/Prediction'
import { Grid, TextField } from '@material-ui/core'
import Button from '../../components/button'
import { paletteColorDark } from '../../theme'
import Predictions from '../../components/predictions'

type PageProps = {
  questions: string[]
}

const ChatForm: NextPage<PageProps> = ({ questions }) => {
  const [open, setOpen] = useState(false)

  const [question, setQuestion] = useState<string>('')
  const [predictions, setPredictions] = useState<Prediction[] | undefined>(
    undefined
  )
  const [loading, setLoading] = useState<boolean>(false)
  console.log('data: ', questions)

  const handleClose = () => setOpen(!open)

  const handleSubmit = async (event: FormEvent) => {
    setLoading(true)
    event.preventDefault()

    const modelPredictions = await getPredictions(question)
    setPredictions(modelPredictions)

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
        <Grid justifyContent={'center'} container item direction="row">
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
        </Grid>
      </form>

      {predictions && (
        <Predictions
          predictions={predictions}
          open={open}
          onClose={handleClose}
        />
      )}
      {/*{loading && <div>Loading ...</div>}*/}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`http://localhost:3000/api/questions`)
  const { Data } = await response.json()
  const questions = Data.map(
    (question: { Question: string }) => question.Question
  )
  return {
    props: {
      questions,
    },
  }
}

export default ChatForm
