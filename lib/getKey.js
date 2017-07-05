const fs = require('fs');
const path = require('path');

const currentDir = path.resolve(process.cwd());

module.exports = (input) => new Promise((resolve, reject) => {
  fs.readFile(`${currentDir}/keys`, 'utf8', (err, data) => {
    if (err) {
      reject(err); return;
    }
    const key = JSON.parse(data)[input];
    resolve(key);
  });
  console.log(`LOG:\tRetrieved ${input} key`);
}).catch(err => console.log(err));
