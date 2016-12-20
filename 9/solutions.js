console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const Decompresser = require('./decompresser');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const decompresser = new Decompresser();
decompresser.parseFile(data);

module.exports = {
  1: () => {
    decompresser.decompressV1();
    const rval = decompresser.getCharCount();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = decompresser.getV2CharCount();

    console.timeEnd('Time Taken');
    return rval;
  }
}
