export const removeEmpty = <T>(obj: T): Partial<T> => {
  return Object.entries(obj)
    .filter(([_, v]) => !!v)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}) as T;
};
