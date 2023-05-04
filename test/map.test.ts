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

const { map } = require('../dist/delay');

describe('map function', () => {
  test('map should return an empty array when given an empty array', () => {});
  test('map should return an array of the same length as the input array', () => {});
  test('map should apply the function to each item in the input array', () => {});
  test('map should return an array of the same type as the output of the function', () => {});
  test('map should return an array of promises', () => {});
  test('map should reject if the function throws an error', () => {});
  test('map should reject if one of the promises in the array rejects', () => {});
  test('map should resolve with the correct output', () => {});
  test('map should handle large arrays', () => {});
  test('map should handle a mix of resolved and rejected promises', () => {});
});
