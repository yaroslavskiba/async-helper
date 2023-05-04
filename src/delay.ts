const delay = (ms: number = 1000): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof ms !== 'number') {
      reject(new Error('Oops, something wrong'));
    } else {
      setTimeout(resolve, ms);
    }
  });
};

module.exports = {
  delay,
};
