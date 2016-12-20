console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const IpAnalyser = require('./ipAnalyser');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const ipAnalyser = new IpAnalyser();
ipAnalyser.parseIps(data);

module.exports = {
  1: () => {
    const rval = ipAnalyser.countTlsIps();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = ipAnalyser.countSslIps();

    console.timeEnd('Time Taken');
    return rval;
  }
}
