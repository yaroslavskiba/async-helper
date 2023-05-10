const { retryWithBackoff } = require('../dist/retryWithBackoff');

describe('retryWithBackoff function', () => {
  const successFn = () => Promise.resolve('success');
  const failingFn = () => Promise.reject(new Error('failure'));
  const longRunningFn = () => new Promise((resolve) => setTimeout(() => resolve('success'), 500));

  test('resolves immediately if function succeeds on first attempt', async () => {
    const result = await retryWithBackoff(successFn, 3, 100, 2);
    expect(result).toBe('success');
  });

  test('rejects if function fails on all attempts', async () => {
    await expect(retryWithBackoff(failingFn, 2, 100, 2)).rejects.toThrowError('failure');
  });

  test('resolves with correct value for long running function', async () => {
    const result = await retryWithBackoff(longRunningFn, 3, 100, 2);
    expect(result).toBe('success');
  });

  test('rejects with correct error message if function fails', async () => {
    await expect(retryWithBackoff(failingFn, 3, 100, 2)).rejects.toThrowError('failure');
  });
});
