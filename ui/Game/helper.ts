const some = (arr1: Array<string>, compare: Array<string>) =>
  arr1.some((r) => compare.includes(r));

export { some };