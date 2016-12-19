const _ = require('lodash');
const fs = require('fs');
const MapMaker = require('./mapMaker');

const favouriteNumber = 1352;

const mapMaker = new MapMaker(favouriteNumber);

module.exports = {
  1: () => {
    return mapMaker.navigateTo(31,39);
  },
  2: () => {
    return mapMaker.navigateUntil(50);
  }
}
