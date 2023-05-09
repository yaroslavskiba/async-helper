const { series } = require('../dist/series');

describe('series function', () => {
  const createTask = (value, delay) => () => new Promise((resolve) => setTimeout(() => resolve(value), delay));

  test('should return an empty array when no tasks are provided', async () => {
    const result = await series([]);
    expect(result).toEqual([]);
  });

  test('should execute tasks in series', async () => {
    const tasks = [createTask(1, 100), createTask(2, 50), createTask(3, 10)];
    const result = await series(tasks);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should handle a single task', async () => {
    const tasks = [createTask(1, 100)];
    const result = await series(tasks);
    expect(result).toEqual([1]);
  });

  test('should handle tasks with different delays', async () => {
    const tasks = [createTask(1, 100), createTask(2, 50), createTask(3, 200)];
    const result = await series(tasks);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should handle tasks with zero delay', async () => {
    const tasks = [createTask(1, 0), createTask(2, 0), createTask(3, 0)];
    const result = await series(tasks);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should handle tasks with the same delay', async () => {
    const tasks = [createTask(1, 100), createTask(2, 100), createTask(3, 100)];
    const result = await series(tasks);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should handle tasks with mixed delays', async () => {
    const tasks = [createTask(1, 100), createTask(2, 0), createTask(3, 50)];
    const result = await series(tasks);
    expect(result).toEqual([1, 2, 3]);
  });

  test('should handle tasks that return different types', async () => {
    const tasks = [createTask(1, 100), createTask('two', 50), createTask({ value: 3 }, 10)];
    const result = await series(tasks);
    expect(result).toEqual([1, 'two', { value: 3 }]);
  });

  test('should handle tasks that throw errors', async () => {
    const errorTask = () => Promise.reject(new Error('Task failed'));
    const tasks = [createTask(1, 100), errorTask, createTask(3, 10)];

    try {
      await series(tasks);
    } catch (error) {
      expect(error.message).toBe('Task failed');
    }
  });

  test('should stop executing tasks after an error', async () => {
    const errorTask = () => Promise.reject(new Error('Task failed'));
    const tasks = [createTask(1, 100), errorTask, createTask(3, 10)];

    try {
      await series(tasks);
    } catch (error) {
      expect(error.message).toBe('Task failed');
    }

    const result = await series(tasks.slice(0, 1));
    expect(result).toEqual([1]);
  });
});
