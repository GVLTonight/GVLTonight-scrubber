const getSmileys = require('./lib/smileys_events');
const _fbEvents = require('./lib/fb_events.js');
const _smileysEvents = require('./lib/smileys_events.js');
const _radioroomEvents = require('./lib/radioroom_events.js');

function _smileysData() { return _smileysEvents.getSmileysData(); }
function _facebookData() { return _fbEvents(); }
function _radioroomData() { return _radioroomEvents(); }

module.exports = {
  gvltonight: {
    title: 'gvltonight',
    url: 'gvltonight.com',
    api: 'api.gvltonight.com',
    data: [_facebookData(), _smileysData(), _radioroomData()],
    request: {
      smileys: {
        url: 'https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23FFFFFF&src=smileysacousticcafe@gmail.com&color=%230D7813&ctz=America/New_York',
        key: () => getSmileys.getgetSmileysKey(),
        data: () => getSmileys.getSmileysData(),
      },
    },
  },

  colatonight: {
    title: 'colatonight',
    url: 'colatonight.com',
    api: 'api.colatonight.com',
  },
};
