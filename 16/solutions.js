console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const DataFiller = require('./dataFiller');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

module.exports = {
  1: () => {
    const dataFiller = new DataFiller(272);
    dataFiller.fillDisk(data);
    const rval = dataFiller.getChecksum();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const dataFiller = new DataFiller(35651584);
    dataFiller.fillDisk(data);
    const rval = dataFiller.getChecksum();

    console.timeEnd('Time Taken');
    return rval;
  }
}
