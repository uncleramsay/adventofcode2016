console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const Sculpture = require('./sculpture');
const Timer = require('./timer');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const data2 = fs.readFileSync(`${__dirname}/data2.txt`, 'utf8').trim();

const sculpture = new Sculpture();
const timer = new Timer(sculpture);

module.exports = {
  1: () => {
    sculpture.parseBlueprint(data);
    const rval = timer.findFirstStartTime();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    sculpture.parseBlueprint(data2);
    const rval = timer.findFirstStartTime();

    console.timeEnd('Time Taken');
    return rval;
  }
}
