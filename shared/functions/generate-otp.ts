export const generateOtp = () => {
  return [...Array(6)]
    .map(() => {
      return Math.floor(Math.random() * 10).toString();
    })
    .reduce((acc, curr) => acc + curr, "");
};
