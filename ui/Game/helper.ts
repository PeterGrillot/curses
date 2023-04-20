function some(input: string[], token: string[]): boolean {
  const lowerCaseInput = input.map((str) => str.toLowerCase());
  const lowerCaseToken = token.map((str) => str.toLowerCase());

  return lowerCaseInput.some((r) => lowerCaseToken.includes(r));
}


function searchWord(input: string, token: string): boolean {
  return input.toLowerCase().includes(token.toLowerCase());
}

function randomStringFromArray(arr: Array<string>) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export { some, searchWord, randomStringFromArray };