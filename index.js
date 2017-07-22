#!/usr/bin/env node
const scrubber = require('./lib/main.js');
const Dossier = require('./dossier');
const logFile = require('./utils/logFile');
const moment = require('moment');
const jsonLogUpdater = require('jsonfile-updater');
const fs = require('fs');

const file = 'GVLLog.json';

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
  jsonLogUpdater(file).add(moment().format(), logFile, (err) => {
    if (err) return console.log(err);

    const getParsedLogFile = () => JSON.parse(fs.readFileSync(file));
    const logKeys = Object.keys(getParsedLogFile());

    if (logKeys.length >= 28) {
      jsonLogUpdater(file).delete(logKeys[0], (erro) => {
        if (erro) return console.log(erro);
        return null;
      });
    }
    return console.log(`${moment().format()} : All Okay`);
  });
}).catch((err) => console.log(err));
