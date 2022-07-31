const min = 0;
const max = 10;

export const getRandom = (): number => {
  return Math.round(Math.random() * (max - min) + min);
};
