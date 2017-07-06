#!/usr/bin/env node
const _fbEvents = require('./fb_events.js');
const _smileysEvents = require('./smileys_events.js');
const _radioroomEvents = require('./radioroom_events.js');
const getKey = require('./getKey.js');

const clog = console.log;
const mongodb = require('mongodb');
const moment = require('moment');

const _events = [];

function _smileysData() { return _smileysEvents(); }
function _facebookData() { return _fbEvents(); }
function _radioroomData() { return _radioroomEvents(); }

module.exports = () => {
  Promise.all(
    [
      _facebookData(),
      _smileysData(),
      _radioroomData(),
    ])
    // --
    // use Array Spread syntax to concat arr array
    // --
    .then((arr) => _events.concat(...arr))
    .then(events => {
      clog(`LOG:\tFound ${events.length} events.`);

      getKey('mlab')
        .then(uri => {
          mongodb.MongoClient.connect(uri, (err, db) => {
            if (err) throw err;
            clog('LOG:\tConnection to ALLEVENTS mlab opened');
            const colArr = ['events'];

            events.forEach(el => {
              const allEvents = db.collection('eventstore');
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

            db.close(error => {
              if (error) throw error;
              clog(`LOG:\tMongo Collections: ${[...new Set(colArr)].toString()}`);
              clog('LOG:\tConnection to ALLEVENTS mlab closed');
            });
          });
        });
    })
    .catch(err => console.log(err));
};
