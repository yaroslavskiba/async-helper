const parallel = <T>(tasks: (() => Promise<T>)[]): Promise<T[]> => {
  if (!tasks.every((fn) => typeof fn === 'function')) {
    throw new Error('Oops, something went wrong! One or more elements in the array is not a function');
  }

  return Promise.all(tasks.map((fn) => fn()))
    .then((results) => {
      return results;
    })
    .catch((err) => {
      throw new Error(`Oops, something went wrong! ${err}`);
    });
};

module.exports = {
  parallel,
};
