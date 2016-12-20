const MapMaker = require('./mapMaker');

const passcode = 'bwnlcvfs';
const mapMaker = new MapMaker(passcode);

module.exports = {
  1: () => {
    return mapMaker.navigateTo(3, 3);
  },
  2: () => {
    return mapMaker.navigateToLongest(3, 3);
  }
}
