"use strict";
const race = (promises) => {
    return new Promise((resolve, reject) => {
        promises.forEach((promise) => {
            promise
                .then((result) => {
                resolve(result);
            })
                .catch((err) => {
                reject(new Error(`Oops, something wrong! ${err}`));
            });
        });
    });
};
module.exports = {
    race,
};
