export const getVocabularyList = (questions: string[]) => {
  const bagOfWords: { [key: string]: number } = {}
  let allWords: string[] = []
  const wordReference: { [key: string]: number } = {}
  questions.forEach((q) => {
    const words = q
      .replace(/[^a-z ]/gi, '')
      .toLowerCase()
      .split(' ')
      .filter((x) => !!x)
    words.forEach((w) => {
      if (!bagOfWords[w]) {
        bagOfWords[w] = 0
      }
      bagOfWords[w]++ // Counting occurrence just for word frequency fun
    })
  })

  allWords = Object.keys(bagOfWords)
  allWords.forEach((w, i) => {
    wordReference[w] = i + 1
  })

  return {
    bagOfWords,
    allWords,
    wordReference,
  }
}
