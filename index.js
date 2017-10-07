#!/usr/bin/env node
const scrubber = require('./lib/main.js');
const Dossier = require('./dossier');
const logFile = require('./utils/logFile');

const writeLog = require('./utils/logWriter');

const file = './GVLLog.json';

async function entry() {
  return Promise.all([
    scrubber(
      Dossier.gvltonight.data(),
      Dossier.gvltonight.collection,
      Dossier.gvltonight.market),
    scrubber(
      Dossier.colatonight.data(),
      Dossier.colatonight.collection,
      Dossier.colatonight.market,
    ),
    scrubber(
      Dossier.avltonight.data(),
      Dossier.avltonight.collection,
      Dossier.avltonight.market,
    ),
    scrubber(
      Dossier.queencitytonight.data(),
      Dossier.queencitytonight.collection,
      Dossier.queencitytonight.market,
    ),
  ]);
}

entry().then((log) => {
  writeLog(file, logFile);
}).catch((err) => console.log(err));
