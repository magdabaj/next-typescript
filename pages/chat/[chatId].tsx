import React, { ChangeEvent, FormEvent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import '@tensorflow/tfjs'
import { getPredictions } from '../../helpers/getPredictions'
import { Prediction } from '../../model/Prediction'
import DisplayTextToxicity from '../../components/displayTextToxicity'

type PageProps = {
  questions: []
}

const ChatPage: NextPage<PageProps> = ({questions}) => {
  const [question, setQuestion] = useState<string>('')
  const [predictions, setPredictions] = useState<Prediction[] | undefined>(undefined)
  console.log("data: ", questions)


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const modelPredictions = await getPredictions(question)
    setPredictions(modelPredictions)
    console.log("predictions: ", predictions)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
    console.log(question)
  }
  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor={"question"}>Ask me a question</label>
      <input type="text" id={"question"} onChange={handleChange} value={question} required />
      <button type="submit" onSubmit={handleSubmit}>Send</button>
      {predictions && <DisplayTextToxicity predictions={predictions}/>}
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`http://localhost:3000/api/questions`)
  const { Data } = await response.json()
  const questions = Data.map((question: { Question: string }) => question.Question)
  return {
    props: {
      questions
    }
  }
}

export default ChatPage