export const formatCharLength = (str: string, len: number): string =>
  str.length > len ? `${str.substring(0, len - 1)}...` : str;
