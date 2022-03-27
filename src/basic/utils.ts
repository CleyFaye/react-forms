let nextId = 0;

const RANDOM_MAX = 1000;

/** Return a reasonably unique random ID to use as an HTML id */
export const getUniqId = (): string => {
  const random = Math.floor(Math.random() * RANDOM_MAX);
  const id = nextId++;
  return `${random}-${id}`;
};
