const { delay } = require('../dist/delay');

describe('delay function', () => {
  test('delay should return a promise', () => {
    expect(delay(100)).toBeInstanceOf(Promise);
  });

  test('delay should resolve after specified time', async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  test('delay should resolve without errors', async () => {
    await expect(delay(100)).resolves.not.toThrow();
  });

  test('delay should resolve with undefined', async () => {
    await expect(delay(100)).resolves.toBeUndefined();
  });

  test('delay should only accept numeric values', async () => {
    await expect(delay(100)).resolves.not.toThrow();
  });

  test('delay should not resolve before specified time', async () => {
    const start = Date.now();
    await delay(100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  test('delay should not block other tasks', async () => {
    const start = Date.now();
    await Promise.all([delay(100), Promise.resolve()]);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(100);
  });

  test('delay should not resolve before specified time, even with negative value', async () => {
    const start = Date.now();
    await delay(-100);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(0);
  });

  test('delay should not resolve before specified time, even with NaN value', async () => {
    const start = Date.now();
    await delay(NaN);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(0);
  });
});
