export const createTokenizedVector = (questions: string[], wordReference: {[key: string]: number}) => {
  const maxSentenceLength = 30;
  let vectors: number[][] = [];
  questions.forEach( q => {
    let qVec = [];
    // Use a regex to only get spaces and letters and remove any blank elements
    let words = q.replace(/[^a-z ]/gi, "").toLowerCase().split( " " ).filter( x => !!x );
    for( let i = 0; i < maxSentenceLength; i++ ) {
      if( words[ i ] ) {
        qVec.push( wordReference[ words[ i ] ] );
      }
      else {
        // Add padding to keep the vectors the same length
        qVec.push( 0 );
      }
    }
    vectors.push( qVec );
  });

  let outputs = questions.map( ( q, index ) => {
    let output = [];
    for( let i = 0; i < questions.length; i++ ) {
      output.push( i === index ? 1 : 0 );
    }
    return output
  })

  return { outputs, maxSentenceLength, vectors }
}