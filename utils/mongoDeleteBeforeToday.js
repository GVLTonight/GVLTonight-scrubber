const mongodb = require('mongodb');
const moment = require('moment');
const getKey = require('../utils/getKey');
const clog = console.log;

const today = moment().format('YYYY-MM-DD');

module.exports = (dbName) => {
  return new Promise((resolve, reject) => {
    getKey('mlab')
    .then(uri => {
      mongodb.MongoClient.connect(uri, (err, db) => {
        db.collection(dbName).deleteMany({
          date: {
            $lt: today,
          },
        });

        resolve(db.collection(dbName).count().then(x => clog(`LOG:\tTotal number of events in eventstore ${x}`)));

        db.close(error => {
          if (error) throw error;
          clog('LOG:\tConnection to ALLEVENTS mlab closed');
        });
      });
    });
  });
};
