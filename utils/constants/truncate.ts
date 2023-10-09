export const truncateText = (
  text: string,
  maxLenght: number,
  length: number,
  state: boolean
): string => {
  if (state) {
    return text;
  } else {
    return text.length > maxLenght ? text.substring(0, length) + "..." : text;
  }
};
