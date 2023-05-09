const { race } = require('../dist/race');

describe('race function', () => {
  test('should resolve with correct value', async () => {
    const promises = [Promise.resolve('success')];
    const result = await race(promises);
    expect(result).toEqual('success');
  });

  test('should reject with correct error', async () => {
    const promises = [Promise.reject(new Error('error'))];
    await expect(race(promises)).rejects.toThrow('error');
  });

  test('should resolve with first resolved promise', async () => {
    const promises = [Promise.resolve('success1'), Promise.resolve('success2')];
    const result = await race(promises);
    expect(result).toEqual('success1');
  });

  test('should reject with first rejected promise', async () => {
    const promises = [Promise.reject(new Error('error1')), Promise.reject(new Error('error2'))];
    await expect(race(promises)).rejects.toThrow('error1');
  });

  test('should resolve with first resolved promise, regardless of order', async () => {
    const promises = [
      new Promise((resolve) => setTimeout(() => resolve('success1'), 100)),
      new Promise((resolve) => setTimeout(() => resolve('success2'), 50)),
    ];
    const result = await race(promises);
    expect(result).toEqual('success2');
  });

  test('should reject with first rejected promise, regardless of order', async () => {
    const promises = [
      new Promise((_, reject) => setTimeout(() => reject(new Error('error1')), 100)),
      new Promise((_, reject) => setTimeout(() => reject(new Error('error2')), 50)),
    ];
    await expect(race(promises)).rejects.toThrow('error2');
  });
});
