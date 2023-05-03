const map = <T, U>(items: T[], fn: (item: T) => Promise<U>): Promise<U[]> => {
  return Promise.all(items.map(fn)).catch((err) => {
    throw new Error(`Oops, something wrong! 
      ${err}`);
  });
};
