export type Prediction = {
  label: string;
  results: {
    probabilities: Float32Array;
    match: boolean;
  }[];
}