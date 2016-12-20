console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const Controller = require('./controller');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const data2 = fs.readFileSync(`${__dirname}/data2.txt`, 'utf8').trim();

const controller = new Controller();

module.exports = {
  1: () => {
    controller.parseLocations(data);
    const rval = controller.calculateMoves();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    controller.parseLocations(data2);
    const rval = controller.calculateMoves();

    console.timeEnd('Time Taken');
    return rval;
  }
}
