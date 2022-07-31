const maxTextLength = 200;

type filterType = {
  isPasses: boolean;
  error: string;
  text: string;
};
export const filter = (message: string): filterType => {
  if (message.length > maxTextLength) {
    return {
      isPasses: false,
      error: 'Слишком много текста',
      text: '',
    };
  }
  if (!message.trim()) {
    return {
      isPasses: false,
      error: 'Введите текст',
      text: '',
    };
  }

  return {
    isPasses: true,
    error: '',
    text: message,
  };
};
