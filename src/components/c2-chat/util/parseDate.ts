const ten = 10;

export const parseDate = (time: string): string => {
  const date = new Date(Date.parse(time));
  const h = date.getHours() < ten ? `0${date.getHours()}` : date.getHours();
  const m = date.getMinutes() < ten ? `0${date.getMinutes()}` : date.getMinutes();

  return `${h}:${m}`;
};
