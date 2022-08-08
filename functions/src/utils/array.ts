export const replaceAt = <Item>(
  array: Item[],
  index: number,
  value: Item,
): Item[] => {
  const result = array.slice(0);
  result[index] = value;
  return result;
};
