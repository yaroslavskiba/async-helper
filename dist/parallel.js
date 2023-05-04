"use strict";
const parallel = (tasks) => {
    return Promise.all(tasks.map((fn) => fn())).catch((err) => {
        throw new Error(`Oops, something wrong!
      ${err}`);
    });
};
module.exports = {
    parallel,
};
