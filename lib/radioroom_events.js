const request = require('request');

const shows = [];

function getRadioRoomData() {
  return new Promise((resolve, reject) => {
    const url = 'https://rest.bandsintown.com/artists/theradioroom/events/?app_id=gvltonight';
    request(url, (err, res) => {
      if (err) {
        reject(err); return;
      }
      const items = JSON.parse(res.body);
      items.forEach(item => {
        const _rawDate = item.datetime;
        const show = {
          sortBy: 'radioroom',
          sortOrder: 1,
          venue: {
            name: 'The Radio Room',
            url: 'http://www.radioroomgreenville.com/',
            latitude: 34.886762,
            longitude: -82.390264,
            country: 'United States',
            city: 'Greenville',
            state: 'SC',
            street: '110 Poinsett Hwy',
            zip: '29609',
          },
          title: item.venue.name,
          description: undefined,
          url: item.url,
          time: _rawDate.split('T')[1],
          date: _rawDate.split('T')[0],
          datetime: _rawDate,
        };
        shows.push(show);
      });
      resolve(shows);
    });
  }).catch(err => console.log(err));
}

module.exports = getRadioRoomData;
