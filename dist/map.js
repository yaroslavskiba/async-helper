"use strict";
const map = (items, fn) => {
    if (items.length === 0) {
        return Promise.resolve([]);
    }
    return Promise.all(items.map(fn))
        .then((results) => {
        return results;
    })
        .catch((err) => {
        throw new Error(`Oops, something went wrong! ${err}`);
    });
};
module.exports = {
    map,
};
