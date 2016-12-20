console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const Screen = require('./screen');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const screen = new Screen(50, 6);
screen.parseInstructions(data);
screen.followInstructions();

module.exports = {
  1: () => {
    const rval = screen.countLights();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    screen.displayScreen();

    console.timeEnd('Time Taken');
    return '';
  }
}
