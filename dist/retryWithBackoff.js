"use strict";
function retryWithBackoff(fn, retries, initialDelayMs, backoffFactor) {
    return new Promise((resolve, reject) => {
        function retry(attempt) {
            fn()
                .then(resolve)
                .catch((error) => {
                if (attempt >= retries) {
                    reject(error);
                }
                else {
                    const delay = initialDelayMs * Math.pow(backoffFactor, attempt);
                    setTimeout(() => {
                        retry(attempt + 1);
                    }, delay);
                }
            });
        }
        if (retries === 0) {
            Promise.resolve();
        }
        else {
            retry(0);
        }
    });
}
module.exports = {
    retryWithBackoff,
};
