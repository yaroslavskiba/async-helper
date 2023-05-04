"use strict";
const series = (tasks) => {
    const results = [];
    let index = 0;
    const executeTask = () => {
        if (index >= tasks.length) {
            return Promise.resolve(results);
        }
        const task = tasks[index];
        index++;
        return task().then((result) => {
            results.push(result);
            return executeTask();
        });
    };
    return executeTask();
};
module.exports = {
    series,
};
