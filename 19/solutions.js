const _ = require('lodash');
const fs = require('fs');
const WhiteElephant = require('./whiteElephant');

const numberOfElves = 3001330;
const whiteElephant = new WhiteElephant(numberOfElves);

module.exports = {
  1: () => {
    whiteElephant.play();
    return whiteElephant.getWinner();
  },
  2: () => {
    whiteElephant.playWithOppositeRules();
    return whiteElephant.getWinner();
  }
}
