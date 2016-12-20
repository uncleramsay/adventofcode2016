console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const IpValidator = require('./ipValidator');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const ipValidator = new IpValidator();
ipValidator.parseBlacklist(data);

module.exports = {
  1: () => {
    const rval = ipValidator.findLowestIp();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = ipValidator.findAllIps();

    console.timeEnd('Time Taken');
    return rval;
  }
}
