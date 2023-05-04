"use strict";
const delay = (ms = 1000) => {
    return new Promise((resolve, reject) => {
        if (typeof ms !== 'number') {
            reject(new Error('Oops, something wrong'));
        }
        else {
            setTimeout(resolve, ms);
        }
    });
};
module.exports = {
    delay,
};
