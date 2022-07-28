export type message = {
  id: string;
  from: string;
  text: string;
  createdAt: string;
};

export type finalMessage = message & { lvl: number };
