const _ = require('lodash');
const fs = require('fs');
const TileFinder = require('./tileFinder');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const tileFinder = new TileFinder();
tileFinder.parseFirstRow(data);

module.exports = {
  1: () => {
    tileFinder.addRows(39);
    return tileFinder.countSafeTiles();
  },
  2: () => {
    tileFinder.addRows(399999);
    return tileFinder.countSafeTiles();
  }
}
