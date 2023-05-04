"use strict";
const retry = (fn, retries, delayMs) => {
    return new Promise((resolve, reject) => {
        fn()
            .then((value) => resolve(value))
            .catch((err) => {
            if (retries > 0) {
                setTimeout(() => {
                    retry(fn, retries - 1, delayMs)
                        .then(resolve)
                        .catch(reject);
                }, delayMs);
            }
            else {
                reject(new Error(`Oops, something wrong! ${err}`));
            }
        });
    });
};
module.exports = {
    retry,
};
