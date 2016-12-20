console.time('Time Taken');

const MapMaker = require('./mapMaker');

const passcode = 'bwnlcvfs';
const mapMaker = new MapMaker(passcode);

module.exports = {
  1: () => {
    const rval = mapMaker.navigateTo(3, 3);

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = mapMaker.navigateToLongest(3, 3);

    console.timeEnd('Time Taken');
    return rval;
  }
}
