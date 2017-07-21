#!/usr/bin/env node
const scrubber = require('./lib/main.js');
const Dossier = require('./dossier');
const logger = require('./utils/logFile');
const moment = require('moment');
const updater = require('jsonfile-updater');
const fs = require('fs');

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
  ]);
}

entry().then((log) => {
  const file = 'GVLLog.json';

  updater(file).add(moment().format(), log[0], (err) => {
    if (err) return console.log(err);
    return console.log(log[0]);
  });
});
