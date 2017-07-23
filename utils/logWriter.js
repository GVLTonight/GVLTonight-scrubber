const fs = require('fs-extra');
const moment = require('moment');

function writeFiles(file) {
  return new Promise(resolve => {
    // const checkFile = fs.readJsonSync(file, { throws: false });
    if (fs.readJsonSync(file, { throws: false }) === null) {
      // console.log(checkFile);
      fs.writeJson(file, {}, { spaces: 2 })
        .then(() => writeFiles(file))
        .catch(err => {
          console.error(err);
        });
    }
    return resolve(fs.readJsonSync(file, { throws: false }));
  });
}

module.exports = (file, data) => {
  writeFiles(file)
  .then(() => {
    fs.readJson(file)
      .then(x => {
        const newobj = x;
        newobj[moment().format()] = data;
        const objkeys = Object.keys(newobj);
        if (objkeys.length >= 10) {
          delete newobj[objkeys[0]];
        }
        fs.writeJson(file, newobj, { spaces: 2 })
          .then(() => {
            console.log(objkeys.length);
          })
          .catch(err => {
            console.error(err);
          });
      });
  }).catch(err => console.log(err));
};
