// GVL SPECIFIC
const _smileysEvents = require('./lib/smileys_events.js');
const _fbEvents = require('./lib/fb_events.js');
const _smileysData = () => _smileysEvents.getSmileysData();
// const _radioroomEvents = require('./lib/radioroom_events.js');
// const _radioroomData = () => _radioroomEvents();

// GLOBAL FACEBOOK BUILDER
const fbBatch = require('./utils/fbBatchBuilder');
const _facebookData = (batchArray, market) => _fbEvents(batchArray, market);

const gvl = fbBatch([
  'GottRocksgvl',
  'thevelofellowgvl',
  'groundzeroSC',
  'iongreenville',
  'villivemusic',
  'gmapunx',
  'wpbrradioroom',
  'thespinningjennygreer',
  'tipsymusicpub',
]);

const cola = fbBatch([
  'infiniteroom',
  'columbiamuseum',
  'mainstreetpublichouse',
  'musicfarmcola',
  'NBTavern',
  'billsmusicshop',
  'TinRoofColumbia',
]);

const avl = fbBatch([
  'AVLMusicHall',
  'TheOrangePeelAsheville',
  'greyeagleasheville',
  'AshevilleCivicCenter',
  'HighlandBrewingCompany',
  'NewMtnAVL',
  'OneStopAVL',
  // 'OneStopAsheville', // this line broke everything. Keep here as reminder.
]);

const clt = fbBatch([
  'THEMILESTONECLUB',
  'FillmoreNC',
  'UptownAmp',
]);

const dossier = {
  gvltonight: {
    collection: 'eventstore',
    title: 'gvltonight',
    url: 'gvltonight.com',
    api: 'api.gvltonight.com',
    market: 'GVL',
    data: () => [
      _facebookData(gvl, 'GVL'),
      _smileysData(),
      // _radioroomData(),
    ],
  },

  colatonight: {
    collection: 'colatonight',
    title: 'colatonight',
    url: 'colatonight.com',
    api: 'api.colatonight.com',
    market: 'COLA',
    data: () => [
      _facebookData(cola, 'COLA'),
    ],
  },

  avltonight: {
    collection: 'avltonight',
    title: 'avltonight',
    url: 'avltonight.com',
    api: 'api.avltonight.com',
    market: 'AVL',
    data: () => [
      _facebookData(avl, 'AVL'),
    ],
  },

  queencitytonight: {
    collection: 'queencitytonight',
    title: 'queencitytonight',
    url: 'queencitytonight.com',
    api: 'api.queencitytonight.com',
    market: 'CLT',
    data: () => [
      _facebookData(clt, 'CLT'),
    ],
  },
};

module.exports = dossier;
