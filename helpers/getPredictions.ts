import * as toxicity from '@tensorflow-models/toxicity'

export const getPredictions = async (question: string) => {
  const questionsArray: string[] = [question]

  const threshold = 0.9
 // @ts-ignore
  const model = await toxicity.load(threshold)
  return await model.classify([question])
}