const map = <T, U>(items: T[], fn: (item: T) => Promise<U>): Promise<U[]> => {
  if (items.length === 0) {
    return Promise.resolve([]);
  }
  return Promise.all(items.map(fn))
    .then((results) => {
      return results;
    })
    .catch((err) => {
      throw new Error(`Oops, something went wrong! ${err}`);
    });
};

module.exports = {
  map,
};
