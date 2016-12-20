console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const KeyFinder = require('./keyFinder');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const keyFinder = new KeyFinder(data);

module.exports = {
  1: () => {
    const rval = keyFinder.findLastKey(64, false);

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = keyFinder.findLastKey(64, true);

    console.timeEnd('Time Taken');
    return rval;
  }
}
