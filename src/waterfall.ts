const waterfall = <T>(tasks: ((prevResult?: T) => Promise<T>)[]): Promise<T | undefined> => {
  if (tasks.length === 0) {
    return Promise.resolve(undefined);
  }
  let prev: Promise<T | undefined> = Promise.resolve(undefined);

  tasks.forEach((fn) => {
    prev = prev
      .then((res) => fn(res))
      .catch((err) => {
        return Promise.reject('Oops something wrong');
      });
  });

  return prev;
};

module.exports = {
  waterfall,
};
