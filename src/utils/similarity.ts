export function calculateSimilarity(movieA: string, movieB: string): number {
  const setA = new Set(movieA.toLowerCase().split(' '));
  const setB = new Set(movieB.toLowerCase().split(' '));
  
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  
  return intersection.size / union.size;
}