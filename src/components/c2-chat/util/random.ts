const min = 1;
const max = 10;

export const getRandom = (): number => {
  return Math.round(Math.random() * (max - min) + min);
};
