// map should return an empty array when given an empty array
// Проверяет, что функция map возвращает пустой массив, когда ей передается пустой массив.

// map should return an array of the same length as the input array
// Проверяет, что функция map возвращает массив той же длины, что и входной массив.

// map should apply the function to each item in the input array
// Проверяет, что функция map применяет переданную функцию к каждому элементу входного массива.

// map should return an array of the same type as the output of the function
// Проверяет, что функция map возвращает массив того же типа, что и выходные данные функции, переданной в качестве аргумента.

// map should return an array of promises
// Проверяет, что функция map возвращает массив промисов.

// map should reject if the function throws an error
// Проверяет, что функция map отклоняется, если переданная функция выбрасывает ошибку.

// map should reject if one of the promises in the array rejects
// Проверяет, что функция map отклоняется, если один из промисов в массиве отклоняется.

// map should resolve with the correct output
// Проверяет, что функция map разрешается с правильным выходным массивом.

// map should handle large arrays
// Проверяет, что функция map может обрабатывать большие массивы без проблем.

// map should handle a mix of resolved and rejected promises
// Проверяет, что функция map может обрабатывать массив, содержащий как разрешенные, так и отклоненные промисы.

const { map } = require('../dist/map');

describe('map function', () => {
  test('map should return an empty array when given an empty array', async () => {
    const result = await map([]);
    expect(result).toEqual([]);
  });

  test('map should return an array of the same length as the input array', async () => {
    const result = await map(['one', 'two', 'three'], (e) => e);
    expect(result.length).toEqual(['one', 'two', 'three'].length);
  });

  test('map should apply the function to each item in the input array', async () => {
    const result = await map(['one', 'two', 'three'], (e) => e + ' True');
    expect(result).toEqual(['one True', 'two True', 'three True']);
  });

  test('map should return an array of the same type as the output of the function', async () => {
    const result = await map(['one', 2, true], (e) => typeof e);
    expect(result).toEqual(['string', 'number', 'boolean']);
  });

  test('map should return a promise of an array', async () => {
    const result = map(['one', 'two', 'three'], async (e) => e);
    expect(result).toBeInstanceOf(Promise);
    const resolvedResult = await result;
    expect(resolvedResult).toEqual(['one', 'two', 'three']);
  });

  test('map should reject if the function throws an error', async () => {
    const result = map([1, 2, 3], (e) => Promise.reject(e));
    await expect(result).rejects.toThrow();
  });

  test('map should reject if one of the promises in the array rejects', async () => {
    const result = map([1, 2, 3], async (e) => {
      if (e === 2) {
        throw new Error('Oops, something went wrong!');
      }
      return e;
    });
    await expect(result).rejects.toThrow('Oops, something went wrong!');
  });

  test('map should return an empty array if the array is empty', async () => {
    const result = await map([], async (e) => e);
    expect(result).toEqual([]);
  });

  test('map should handle a large array', async () => {
    const input = Array.from({ length: 10000 }, (_, i) => i);
    const result = await map(input, async (e) => e * 2);
    expect(result).toEqual(input.map((e) => e * 2));
  });

  test('map should handle a mix of synchronous and asynchronous functions', async () => {
    const result = await map([1, 2, 3], (e) => {
      if (e % 2 === 0) {
        return Promise.resolve(e * 2);
      }
      return e * 2;
    });
    expect(result).toEqual([2, 4, 6]);
  });
});
