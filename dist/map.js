"use strict";
const map = (items, fn) => {
    return Promise.all(items.map(fn)).catch((err) => {
        throw new Error(`Oops, something wrong! 
      ${err}`);
    });
};
module.exports = {
    map,
};
