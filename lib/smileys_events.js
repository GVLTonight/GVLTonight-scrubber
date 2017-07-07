
const request = require('request');
const moment = require('moment');

const startDate = moment().toISOString();
const endDate = moment().add(7, 'days').toISOString();

const shows = [];

function getSmileysKey() {
  return new Promise((resolve, reject) => {
    const url = 'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23FFFFFF&src=smileysacousticcafe@gmail.com&color=%230D7813&ctz=America/New_York';
    request(url, (err, res) => {
      if (err) {
        reject(err); return;
      }
      const key = res.body.match(/"developerKey":"(.+)"}/)[1];
      resolve(key);
    });
  });
}

function getSmileysData() {
  return new Promise((resolve, reject) => {
    getSmileysKey()
      .then((key) => {
        const url = `https://clients6.google.com/calendar/v3/calendars/smileysacousticcafe@gmail.com/events?calendarId=smileysacousticcafe@gmail.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${startDate}&timeMax=${endDate}&key=${key}`;
        request(url, (err, res) => {
          if (err) {
            reject(err); return;
          }
          const items = JSON.parse(res.body).items;
          for (let i = 0; i < items.length; i++) {
            const _rawDate = items[i].start.dateTime;
            const _rawTime = _rawDate.split('T')[1];
            const show = {
              groupBy: 'smileys',
              sortOrder: 3,
              venue: {
                name: 'Smileys Acoustic Cafe',
                url: 'http://www.smileysacousticcafe.com/calendar.php',
                latitude: 34.842952,
                longitude: -82.405414,
                country: 'United States',
                city: 'Greenville',
                state: 'SC',
                street: '111 Augusta Street',
                zip: '29601',
              },
              title: items[i].summary,
              description: items[i].description,
              url: items[i].htmlLink,
              time: _rawTime.split('-')[0],
              date: _rawDate.split('T')[0],
              datetime: _rawDate,
            };
            shows.push(show);
          }
          resolve(shows);
        });
      });
  });
}

exports.getSmileysData = () => getSmileysData();
exports.getSmileysKey = () => getSmileysKey();
