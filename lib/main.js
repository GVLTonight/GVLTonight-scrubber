const getKey = require('../utils/getKey.js');
const log = require('../utils/logFile');

const clog = console.log;
const mongodb = require('mongodb');
const moment = require('moment');

const _events = [];

module.exports = (dataArray, dbName, market) => {
  return new Promise((resolve, reject) => {
    return Promise.all(dataArray)
    // --
    // use Array Spread syntax to concat arr array
    // --
    .then((arr) => _events.concat(...arr))
    .then(events => {
      // clog(`LOG:\tFound ${events.length} events. ${dbName}`);

      getKey('mlab')
        .then(uri => {
          mongodb.MongoClient.connect(uri, (err, db) => {
            if (err) { reject(err); }
            // clog(`LOG:\tConnection to ${dbName} mlab opened`);
            log[market].dbName = dbName;
            const colArr = ['events'];
            const allEvents = db.collection(dbName);

            events.forEach(el => {
              colArr.push(el.groupBy);
              allEvents.update(
                {
                  title: el.title,
                  date: el.date,
                },
                {
                  groupBy: el.groupBy,
                  sortOrder: el.sortOrder,
                  venue: {
                    name: el.venue.name,
                    url: el.venue.url,
                    latitude: el.venue.latitude,
                    longitude: el.venue.longitude,
                    country: el.venue.country,
                    city: el.venue.city,
                    state: el.venue.state,
                    street: el.venue.street,
                    zip: el.venue.zip,
                  },
                  title: el.title,
                  description: el.description,
                  url: el.url,
                  time: el.time,
                  date: el.date,
                  datetime: el.datetime,
                  updated: moment().toISOString(),
                },
                {
                  upsert: true,
                },
              );
            });

            allEvents.find({
              date: {
                $lt: moment().format('YYYY-MM-DD'),
              },
            }).count().then((z) => {
              log[market].deleted = z;
            }).catch((erro) => { reject(erro); });

            allEvents.deleteMany({
              date: {
                $lt: moment().format('YYYY-MM-DD'),
              },
            });

            log[market].collections = `${[...new Set(colArr)].toString()}`;
            log[market].pushed = events.length;
            allEvents.count().then((y) => {
              log[market].totalEvents = y;
              resolve(log);
            }).catch((error) => reject(error));

            db.close(error => {
              if (error) throw error;
              // clog(`LOG:\tMongo Collections: ${[...new Set(colArr)].toString()}`);
              // clog(`LOG:\tPushed ${events.length} to DB ${dbName}`);
              // clog(`LOG:\tConnection to ${dbName} mlab closed`);
            });
          });
        });
    })
    .catch(err => reject(err));

  // console.log(dossier.gvltonight.request.smileys.data().then(x => console.log(x)));
  });
};
