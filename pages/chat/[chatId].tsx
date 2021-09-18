import React, { FormEvent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import '@tensorflow/tfjs'
import { getPredictions } from '../../helpers/getPredictions'
import { Prediction } from '../../model/Prediction'
import DisplayTextToxicity from '../../components/displayTextToxicity'
import { Button, Grid, TextField } from '@material-ui/core'

type PageProps = {
  questions: string[]
}

const ChatForm: NextPage<PageProps> = ({ questions }) => {
  const [question, setQuestion] = useState<string>('')
  const [predictions, setPredictions] = useState<Prediction[] | undefined>(
    undefined
  )
  console.log('data: ', questions)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const modelPredictions = await getPredictions(question)
    setPredictions(modelPredictions)
    console.log('predictions: ', predictions)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
    console.log(question)
  }
  return (
    <>
      <Grid container direction="row">
        <form onSubmit={handleSubmit}>
          <TextField
            label={'Ask me question'}
            type="text"
            id={'question'}
            onChange={handleChange}
            value={question}
          />
          <Button type="submit" onSubmit={handleSubmit}>
            Send
          </Button>
        </form>
      </Grid>

      {predictions && <DisplayTextToxicity predictions={predictions} />}
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
