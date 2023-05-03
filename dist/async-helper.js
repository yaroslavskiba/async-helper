"use strict";
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
const map = (items, fn) => {
    return Promise.all(items.map(fn)).catch((err) => {
        throw new Error('Oops, something wrong!');
    });
};
const parallel = (tasks) => {
    return Promise.all(tasks.map((fn) => fn()));
};
