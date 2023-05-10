const { waterfall } = require('../dist/waterfall');

describe('waterfall function', () => {
  test('should resolve with undefined if tasks array is empty', async () => {
    const result = await waterfall([]);
    expect(result).toBeUndefined();
  });

  test('should resolve with the result of the last task if tasks array has one task', async () => {
    const result = await waterfall([(prevResult) => Promise.resolve(2)]);
    expect(result).toBe(2);
  });

  test('should pass previous result to the next task', async () => {
    const result = await waterfall([
      (prevResult) => Promise.resolve(prevResult ? prevResult + 2 : 2),
      (prevResult) => {
        expect(prevResult).toBe(2);
        return Promise.resolve(prevResult * 3);
      },
      (prevResult) => {
        expect(prevResult).toBe(6);
        return Promise.resolve(prevResult - 6);
      },
    ]);
    expect(result).toBe(0);
  });

  test('should reject with custom error message if any task rejects', async () => {
    await expect(
      waterfall([
        (prevResult) => Promise.resolve(prevResult ? prevResult + 2 : 2),
        () => Promise.reject('Error'),
        (prevResult) => Promise.resolve(prevResult - 6),
      ]),
    ).rejects.toEqual('Oops something wrong');
  });

  test('should handle async/await errors in tasks with custom error message', async () => {
    const tasks = [
      async () => {
        throw new Error('async error');
      },
    ];

    await expect(waterfall(tasks)).rejects.toEqual('Oops something wrong');
  });

  test('should handle synchronous errors in tasks with custom error message', async () => {
    const tasks = [
      () => {
        throw new Error('sync error');
      },
    ];

    await expect(waterfall(tasks)).rejects.toEqual('Oops something wrong');
  });
});
