import { getVocabularyList } from './getVocabularyList'
import { createTokenizedVector } from './createTokenizedVector'
import * as tf from '@tensorflow/tfjs'

export const processQuestionsData = async (
  questions: string[],
  question: string
) => {
  const { allWords, wordReference } = getVocabularyList(questions)

  const { outputs, maxSentenceLength, vectors } = createTokenizedVector(
    questions,
    wordReference
  )

  const model = tf.sequential()
  // Add 1 to inputDim for the "padding" character
  model.add(
    tf.layers.embedding({
      inputDim: allWords.length + 1,
      outputDim: 128,
      inputLength: maxSentenceLength,
    })
  )
  // model.add(tf.layers.simpleRNN( { units: 32 } ) );
  model.add(
    tf.layers.bidirectional({
      layer: tf.layers.simpleRNN({ units: 32 }),
      mergeMode: 'concat',
    })
  )
  model.add(tf.layers.dense({ units: 50 }))
  model.add(tf.layers.dense({ units: 25 }))
  model.add(
    tf.layers.dense({
      units: questions.length,
      activation: 'softmax',
    })
  )

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  })

  const xs = tf.stack(vectors.map((x) => tf.tensor1d(x)))
  const ys = tf.stack(outputs.map((x) => tf.tensor1d(x)))
  console.log(xs)
  console.log(ys)
  await model.fit(xs, ys, {
    epochs: 20,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Training... Epoch #${epoch} (${logs?.acc})`)
        console.log('Epoch #', epoch, logs)
      },
    },
  })

  const qVec: number[] = []
  const words = question
    .replace(/[^a-z ]/gi, '')
    .toLowerCase()
    .split(' ')
    .filter((x) => !!x)
  for (let i = 0; i < maxSentenceLength; i++) {
    if (words[i]) {
      qVec.push(wordReference[words[i]])
    } else {
      // Add padding to keep the vectors the same length
      qVec.push(0)
    }
  }

  const prediction = await model.predict(tf.stack([tf.tensor1d(qVec)])) //.data();
  console.log('prediction: ' + prediction)
  // let id = prediction.indexOf( Math.max( ...prediction ) );

  return prediction
}
