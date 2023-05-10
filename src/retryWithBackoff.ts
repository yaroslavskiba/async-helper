function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number,
  initialDelayMs: number,
  backoffFactor: number,
): Promise<T> {
  return new Promise((resolve, reject) => {
    function retry(attempt: number) {
      fn()
        .then(resolve)
        .catch((error) => {
          if (attempt >= retries) {
            reject(error);
          } else {
            setTimeout(() => {
              retry(attempt + 1);
            }, initialDelayMs * Math.pow(backoffFactor, attempt));
          }
        });
    }

    retry(0);
  });
}

module.exports = {
  retryWithBackoff,
};
