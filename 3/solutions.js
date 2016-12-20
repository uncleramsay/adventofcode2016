console.time('Time Taken');

const fs = require('fs');
const TriangleSorter = require('./triangleSorter');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const triangleSorter = new TriangleSorter();

module.exports = {
  1: () => {
    triangleSorter.parseSpecRows(data);
    const rval = triangleSorter.getValidTriangles().length;

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    triangleSorter.parseSpecCols(data);
    const rval = triangleSorter.getValidTriangles().length;

    console.timeEnd('Time Taken');
    return rval;
  }
}
