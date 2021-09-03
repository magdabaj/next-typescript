import React, { ChangeEvent, FormEvent, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { processQuestionsData } from '../../helpers/processQuestionsData'
import tf from '@tensorflow/tfjs'

type PageProps = {
  questions: []
}

const ChatPage: NextPage<PageProps> = ({questions}) => {
  const [question, setQuestion] = useState<string>('')
  console.log("data: ", questions)


  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(question)

    const prediction = processQuestionsData(questions, question)
    // Get the index of the highest value in the prediction

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