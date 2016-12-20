console.time('Time Taken');

const fs = require('fs');
const HashFinder = require('./hashFinder');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const hashFinder = new HashFinder();
hashFinder.parseInput(data);

module.exports = {
  1: () => {
    const rval = hashFinder.findPassword();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = hashFinder.findHarderPassword();

    console.timeEnd('Time Taken');
    return rval;
  }
}
