const parallel = <T>(tasks: (() => Promise<T>)[]): Promise<T[]> => {
  return Promise.all(tasks.map((fn) => fn())).catch((err) => {
    throw new Error(`Oops, something wrong!
      ${err}`);
  });
};

module.exports = {
  parallel,
};
