// Використовуємо каррінг для всіх базових функцій
const map = (fn) => (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) result.push(fn(arr[i]));
  return result;
};

const filter = (predicate) => (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) result.push(arr[i]);
  }
  return result;
};

const reduce = (fn, initialValue) => (arr) => {
  let accumulator = initialValue;
  for (let i = 0; i < arr.length; i++) {
    accumulator = fn(accumulator, arr[i]);
  }
  return accumulator;
};

// Виконує функції справа наліво
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

// Виконує функції зліва направо
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const curry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
  return curried;
};

const partial = (fn, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs);

const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) return cache[key];
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};

// --- ТЕСТУВАННЯ ФУНКЦІЙ ---

// 1. Тестуємо pipe
const add2 = (x) => x + 2;
const multiply3 = (x) => x * 3;

// pipe бере число, спочатку додає 2, потім множить на 3
const addThenMultiply = pipe(add2, multiply3);
console.log("Результат роботи pipe (5 + 2) * 3 = ", addThenMultiply(5)); 


// 2. Тестуємо curry
const sum3 = (a, b, c) => a + b + c;
const curriedSum = curry(sum3);

console.log("Результат роботи curry 1 + 2 + 3 = ", curriedSum(1)(2)(3));