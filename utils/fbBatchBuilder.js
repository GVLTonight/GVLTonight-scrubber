const moment = require('moment');

const todaysDate = moment().format('YYYY-MM-DD');
const nextWeek = moment().add(7, 'days').format('YYYY-MM-DD');

module.exports = (inputArray) => {
  const arr = [];
  inputArray.forEach((inp) => {
    arr.push({ method: 'get', relative_url: `/${inp}/events/?since=${todaysDate}&until=${nextWeek}` });
  });
  return arr;
};
