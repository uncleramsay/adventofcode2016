console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const Scrambler = require('./scrambler');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const scrambler = new Scrambler();
scrambler.parseInstructions(data);

module.exports = {
  1: () => {
    const rval = scrambler.scramble('abcdefgh');

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = scrambler.unscramble('fbgdceah');

    console.timeEnd('Time Taken');
    return rval;
  }
}
