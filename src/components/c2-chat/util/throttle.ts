export const throttle = (
  func: (event: Event) => void,
  timeout: number,
): ((...args: any[]) => void) => {
  let timer: any = null;

  return function perform(event: Event) {
    if (timer) return;

    timer = setTimeout(() => {
      func(event);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
};
