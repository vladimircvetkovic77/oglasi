const setTextLimit = (text: string | number, limit: number) => {
  //   cast to string
  const textString = String(text);
  return textString.length > limit
    ? textString.slice(0, limit) + "..."
    : textString;
};
export default setTextLimit;
