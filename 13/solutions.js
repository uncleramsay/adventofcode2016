console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const MapMaker = require('./mapMaker');

const favouriteNumber = 1352;

const mapMaker = new MapMaker(favouriteNumber);

module.exports = {
  1: () => {
    const rval = mapMaker.navigateTo(31,39);

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = mapMaker.navigateUntil(50);

    console.timeEnd('Time Taken');
    return rval;
  }
}
