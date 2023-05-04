const series = <T>(tasks: (() => Promise<T>)[]): Promise<T[]> => {
  const results: T[] = [];
  let index = 0;
  const executeTask = (): Promise<T[]> => {
    if (index >= tasks.length) {
      return Promise.resolve(results);
    }
    const task = tasks[index];
    index++;
    return task().then((result) => {
      results.push(result);
      return executeTask();
    });
  };
  return executeTask();
};

module.exports = {
  series,
};
