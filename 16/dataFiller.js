const _ = require('lodash');

module.exports = class DataFiller {
  constructor(diskSize) {
    this.diskSize = diskSize;
  }

  fillDisk(data) {
    this.data = data;

    while(this.data.length < this.diskSize) {
      const a = this.data;
      let b = a.split('').reverse().join('');
      b = DataFiller.invertData(b);
      this.data = a + '0' + b;
    }

    this.data = this.data.substr(0, this.diskSize);
  }

  getChecksum() {
    let checksum = this.data;

    while(checksum === this.data || checksum.length % 2 === 0) {
      let newChecksum = '';
      for (let i = 0; i < checksum.length; i += 2) {
        newChecksum += (checksum[i] === checksum[i+1]) ? '1' : '0';
      }
      checksum = newChecksum;
    }

    return checksum;
  }

  static invertData(data) {
    let rval = '';
    _.each(data, (char) => {
      rval += char === '1' ? '0' : '1';
    });

    return rval;
  }
}
