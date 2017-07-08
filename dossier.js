// GVL SPECIFIC
const _smileysEvents = require('./lib/smileys_events.js');
const _radioroomEvents = require('./lib/radioroom_events.js');
const _fbEvents = require('./lib/fb_events.js');
const _smileysData = () => _smileysEvents.getSmileysData();
const _radioroomData = () => _radioroomEvents();

// GLOBAL FACEBOOK BUILDER
const fbBatchBuilder = require('./utils/fbBatchBuilder');
const _facebookData = (batchArray) => _fbEvents(batchArray);

const gvl = fbBatchBuilder([
  'GottRocksgvl',
  'thevelofellowgvl',
  'groundzeroSC',
  'iongreenville',
  'villivemusic',
  'gmapunx',
]);

const cola = fbBatchBuilder([
  'mainstreetpublichouse',
  'musicfarmcola',
  'NBTavern',
  'billsmusicshop',
]);

const dossier = {
  gvltonight: {
    collection: 'eventstore',
    title: 'gvltonight',
    url: 'gvltonight.com',
    api: 'api.gvltonight.com',
    data: [
      _facebookData(gvl),
      _smileysData(),
      _radioroomData(),
    ],
  },

  colatonight: {
    collection: 'colatonight',
    title: 'colatonight',
    url: 'colatonight.com',
    api: 'api.colatonight.com',
    data: [
      _facebookData(cola),
    ],
  },
};

module.exports = dossier;
