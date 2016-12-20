const _ = require('lodash');

module.exports = class IpValidator {
  constructor() {
    this.blacklistRanges = [];
  }

  parseBlacklist(blacklist) {
    this.blacklistRanges = blacklist.split('\n');
    this.blacklistRanges.sort((a, b) => {
      return parseInt(a.split('-')[0], 10) - parseInt(b.split('-')[0], 10);
    });
  }

  findLowestIp() {
    return this._findHelper(true);
  }

  findAllIps() {
    return this._findHelper().length;
  }

  _findHelper(lowest) {
    let ips = [];
    let currentMax = 0;

    for (let i = 0; i < this.blacklistRanges.length; i++) {
      const range = this.blacklistRanges[i];

      const min = parseInt(range.split('-')[0], 10);
      const max = parseInt(range.split('-')[1], 10);

      if (min > currentMax + 1) {
        if (lowest) {
          return currentMax + 1;
        }

        for (let j = currentMax + 1; j < min; j++) {
          ips.push(j);
        }
      }

      if (max > currentMax) {
        currentMax = max;
      }
    }

    for (let i = currentMax + 1; i <= 4294967295; i++) {
      ips.push(i);
    }

    return ips;
  }
}
