let nextUniqId = 0;

/** Return a unique ID for this session */
export const getUniqId = (): string => `${Date.now()}-${nextUniqId++}`;
