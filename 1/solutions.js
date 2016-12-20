console.time('Time Taken');

const fs = require('fs');
const MapReader = require('./mapReader');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();
const mapReader = new MapReader();

mapReader.parseInstructions(data);

module.exports = {
  1: () => {
    mapReader.followInstructions();
    const rval = mapReader.getDistanceFromStart();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    mapReader.followInstructionsUntilPathsCross();
    const rval = mapReader.getDistanceFromStart();

    console.timeEnd('Time Taken');
    return rval;
  }
}
