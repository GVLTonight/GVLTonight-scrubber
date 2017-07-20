#!/usr/bin/env node
const scrubber = require('./lib/main.js');
const Dossier = require('./dossier');
const logger = require('./utils/logFile');

async function entry() {
  return Promise.all([
    scrubber(Dossier.gvltonight.data(), Dossier.gvltonight.collection, Dossier.gvltonight.market),
    scrubber(Dossier.colatonight.data(), Dossier.colatonight.collection, Dossier.colatonight.market),
    scrubber(Dossier.avltonight.data(), Dossier.avltonight.collection, Dossier.avltonight.market),
  ]);
  // return [r1, r2, r3];
}

entry().then((log) => {
  console.log(logger);
  // console.log(log);
});

// console.log(Dossier.gvltonight.test(Dossier.gvltonight));
