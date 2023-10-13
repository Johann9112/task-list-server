const fs = require('fs');

const readTasksFromFile = (callback) => {
    fs.readFile('./tasks.json', 'utf8', (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(data));
        }
    });
};

const writeTasksToFile = (tasks, callback) => {
    fs.writeFile('./tasks.json', JSON.stringify(tasks, null, 2), 'utf8', callback);
};

module.exports = {
    readTasksFromFile,
    writeTasksToFile
};
