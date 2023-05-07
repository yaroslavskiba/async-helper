const { parallel } = require('../dist/parallel');

describe('parallel function', () => {
  test('parallel should return a Promise', async () => {
    const result = parallel([]);
    expect(result).toBeInstanceOf(Promise);
  });

  test('parallel should accept an array of functions', async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.resolve(2)];
    const result = await parallel(tasks);
    expect(result).toEqual([1, 2]);
  });

  test('parallel should return an array of results', async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.resolve(2)];
    const result = await parallel(tasks);
    expect(result).toEqual([1, 2]);
  });

  test('parallel should handle errors in functions correctly', async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.reject('error')];
    await expect(parallel(tasks)).rejects.toEqual(new Error('Oops, something went wrong! error'));
  });

  test('parallel should handle empty array correctly', async () => {
    const result = await parallel([]);
    expect(result).toEqual([]);
  });

  test('parallel should handle non-function elements in array correctly', async () => {
    const tasks = [() => Promise.resolve(1), 'not a function', () => Promise.resolve(2)];
    expect(() => parallel(tasks)).toThrow();
  });

  test('parallel should handle different return types correctly', async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.resolve('two'), () => Promise.resolve({ three: 3 })];
    const result = await parallel(tasks);
    expect(result).toEqual([1, 'two', { three: 3 }]);
  });

  test('parallel should handle thrown exceptions correctly', async () => {
    const tasks = [() => Promise.resolve(1), () => Promise.reject()];
    await expect(parallel(tasks)).rejects.toThrow();
  });
});
