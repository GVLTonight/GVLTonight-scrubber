const { FB, FacebookApiException } = require('fb');
const moment = require('moment');
const getKey = require('../utils/getKey.js');
const log = require('../utils/logFile');

const clog = console.log;

const check = (input, venueName) => input.toLowerCase().indexOf(venueName) !== -1;

// Determine what the collection name will be for the more common and popular venues
// -- put them in the correct groupBy bucket
// -- also give them a sort number at array index
// ---- sortDeterminer('string')
// ------ // => ['string', Number]
function sortDeterminer(inputVenue) {
  // console.log(inputVenue);
  if (check(inputVenue, 'radio room')) {
    return ['radioroom', 1000];
  } else if (check(inputVenue, 'gottrocks')) {
    return ['gottrocks', 2000];
  } else if (check(inputVenue, 'smileys')) {
    return ['smileys', 3000];
  } else if (check(inputVenue, 'groundzero')) {
    return ['groundzero', 4000];
  } // eslint-disable-line brace-style

  else if (check(inputVenue, 'brookland')) {
    return ['brookland', 1000];
  } else if (check(inputVenue, 'music farm columbia')) {
    return ['musicfarmcolumbia', 2000];
  } else if (check(inputVenue, 'tin roof columbia')) {
    return ['tinroofcolumbia', 3000];
  } // eslint-disable-line brace-style

  else if (check(inputVenue, 'orange peel')) {
    return ['orangepeel', 1000];
  } else if (check(inputVenue, 'grey eagle')) {
    return ['greyeagle', 2000];
  } else if (check(inputVenue, 'asheville music hall')) {
    return ['avlmusichall', 3000];
  } else if (check(inputVenue, 'new mountain')) {
    return ['civiccenter', 4000];
  } else if (check(inputVenue, 'asheville civic center')) {
    return ['civiccenter', 5000];
  }
  return ['other', 5000];
}

function getFacebookData(batchArray, market) {
  return new Promise((resolve, reject) => {
    getKey('fb').then((key) => {
      const events = [];
      let skipCounter = 0;
      FB.api('', 'post', {
        version: 'v2.8',
        access_token: key,
        batch: batchArray,
      }, (response) => {
        if (!response || response.error) {
          reject(!response ? clog('error occurred') : clog(FacebookApiException, response.error)); return;
        }
        // LOOP through each response from the FB.api({batch: []}) list.
        // -- At the lowest level, extract only the details from
        // -- each event that we'll want to use later on the site.
        for (let i = 0; i < response.length; i++) {
          // --
          // Convert the response's body.data from string to JSON
          // --
          const _currentItem = JSON.parse(response[i].body).data;
          // console.log(_currentItem[0])
          if (!_currentItem) {
            // clog('ERR:\tCURRENTITEM UNDEFINED?!?! WHY');
            // clog(`${market}:\t${JSON.parse(response[i].body).error.message}`);
            log[market].err = `${JSON.parse(response[i].body).error.message}`;
            return;
          }
          for (let k = 0; k < _currentItem.length; k++) {
            // --
            // If event is before todays date, skip
            // --
            if (moment(_currentItem[k].start_time).isSameOrAfter(moment())) {
              // --
              // Check if event has a venue value (some dont) (i think it's IPA)
              // --
              if (_currentItem[k].place && _currentItem[k].place.location) {
                const _rawTime = _currentItem[k].start_time.split('T');
                const event = {
                  groupBy: sortDeterminer(_currentItem[k].place.name)[0],
                  sortOrder: sortDeterminer(_currentItem[k].place.name)[1],
                  venue: {
                    name: _currentItem[k].place.name,
                    url: `https://facebook.com/${_currentItem[k].place.id}`,
                    latitude: _currentItem[k].place.location.latitude,
                    longitude: _currentItem[k].place.location.longitude,
                    country: _currentItem[k].place.location.country,
                    city: _currentItem[k].place.location.city,
                    state: _currentItem[k].place.location.state,
                    street: _currentItem[k].place.location.street,
                    zip: _currentItem[k].place.location.zip,
                  },
                  title: _currentItem[k].name,
                  description: _currentItem[k].description,
                  url: `https://facebook.com/${_currentItem[k].id}`,
                  time: _rawTime[1].split('-')[0],
                  date: _rawTime[0],
                  datetime: _currentItem[k].start_time,
                };
                // --
                // Push "Object event;" to "Array events;"
                // --
                events.push(event);
              } else {
                const name = _currentItem[k].name;
                if (name.indexOf('randma') >= 1) {
                  const _rawTime = _currentItem[k].start_time.split('T');
                  const event = {
                    groupBy: sortDeterminer('other')[0],
                    sortOrder: sortDeterminer('other')[1],
                    venue: {
                      name: undefined,
                      url: undefined,
                      latitude: undefined,
                      longitude: undefined,
                      country: undefined,
                      city: undefined,
                      state: undefined,
                      street: undefined,
                      zip: undefined,
                    },
                    title: _currentItem[k].name,
                    description: _currentItem[k].description,
                    url: `https://facebook.com/${_currentItem[k].id}`,
                    time: _rawTime[1].split('-')[0],
                    date: _rawTime[0],
                    datetime: _currentItem[k].start_time,
                  };
                  events.push(event);
                }
                skipCounter += 1;
              }
            }
          }
        }
        // else {
        //   clog('CURRENTITEM UNDEFINED?!?! WHY');
        // }
        // }
        // clog(`${market}:\tSkipped ${skipCounter} FB events.`);
        log[market].skipped = `${skipCounter}`;
        resolve(events);
      });
    });
  }).catch(err => console.log(err));
}

// getFacebookData()
module.exports = getFacebookData;

// peacecenter rss
// http://www.peacecenter.org/events/rss
