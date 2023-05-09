const { retry } = require('../dist/retry');

describe('retry function', () => {
  test('should resolve with value if function succeeds on first try', async () => {
    const fn = jest.fn(() => Promise.resolve('Success'));
    const result = await retry(fn, 3, 0);
    expect(result).toBe('Success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should retry function if it fails once', async () => {
    let count = 0;
    const fn = async () => {
      count++;
      if (count === 1) {
        throw new Error('Failed once');
      }
      return 'Success';
    };
    const result = await retry(fn, 1, 0);
    expect(result).toBe('Success');
    expect(count).toBe(2);
  });

  test('should retry function if it fails twice', async () => {
    let count = 0;
    const fn = async () => {
      count++;
      if (count <= 2) {
        throw new Error(`Failed ${count} times`);
      }
      return 'Success';
    };
    const result = await retry(fn, 2, 0);
    expect(result).toBe('Success');
    expect(count).toBe(3);
  });

  test('should retry function if it fails more than twice', async () => {
    let count = 0;
    const fn = async () => {
      count++;
      if (count <= 3) {
        throw new Error(`Failed ${count} times`);
      }
      return 'Success';
    };
    const result = await retry(fn, 3, 0);
    expect(result).toBe('Success');
    expect(count).toBe(4);
  });

  test('should resolve with correct value if function succeeds on second try', async () => {
    let count = 0;
    const fn = async () => {
      count++;
      if (count === 2) {
        return 'Success';
      }
      throw new Error('Failed once');
    };
    const result = await retry(fn, 3, 0);
    expect(result).toBe('Success');
    expect(count).toBe(2);
  });

  test('should resolve with correct value if function succeeds after multiple retries', async () => {
    let count = 0;
    const fn = async () => {
      count++;
      if (count <= 3) {
        throw new Error(`Failed ${count} times`);
      }
      return 'Success';
    };
    const result = await retry(fn, 3, 0);
    expect(result).toBe('Success');
    expect(count).toBe(4);
  });

  test('should reject with error message if function fails after all retries', async () => {
    const fn = async () => {
      throw new Error('Failed multiple times');
    };
    try {
      await retry(fn, 2, 0);
    } catch (err) {
      expect(err.message).toBe('Oops, something wrong! Error: Failed multiple times');
    }
  });

  test('should reject with error message if function fails on first try', async () => {
    const fn = async () => {
      throw new Error('Failed once');
    };
    try {
      await retry(fn, 2, 0);
    } catch (err) {
      expect(err.message).toBe('Oops, something wrong! Error: Failed once');
    }
  });

  test('should reject with error message if function fails on second try', async () => {
    let count = 0;
    const fn = async () => {
      count++;
      if (count <= 2) {
        throw new Error(`Failed ${count} times`);
      }
      return 'Success';
    };
    try {
      await retry(fn, 2, 0);
    } catch (err) {
      expect(err.message).toBe('Oops, something wrong! Error: Failed 2 times');
    }
  });

  test('should reject with error message if function fails on third try', async () => {
    let count = 0;
    const fn = async () => {
      count++;
      if (count <= 3) {
        new Error(`Failed ${count} times`);
      }
      return 'Success';
    };
    try {
      await retry(fn, 2, 0);
    } catch (err) {
      expect(err).toBe('Oops, something wrong! Error: Failed 3 times');
    }
  });
});
