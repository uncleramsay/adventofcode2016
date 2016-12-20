const _ = require('lodash');
const fs = require('fs');
const IpValidator = require('./ipValidator');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const ipValidator = new IpValidator();
ipValidator.parseBlacklist(data);

module.exports = {
  1: () => {
    return ipValidator.findLowestIp();
  },
  2: () => {
    return ipValidator.findAllIps();
  }
}
