#!/usr/bin/env node
const scrubber = require('./lib/main.js');
const Dossier = require('./dossier');

Promise.all([
  scrubber(Dossier.gvltonight.data, Dossier.gvltonight.collection),
  scrubber(Dossier.colatonight.data, Dossier.colatonight.collection),
]);
// console.log(Dossier.gvltonight.test(Dossier.gvltonight));
