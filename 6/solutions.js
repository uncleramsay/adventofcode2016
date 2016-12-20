console.time('Time Taken');

const _ = require('lodash');
const fs = require('fs');
const SignalDecoder = require('./signalDecoder');

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const signalDecoder = new SignalDecoder();
signalDecoder.parseSignal(data);

module.exports = {
  1: () => {
    const rval = signalDecoder.getDecodedMessage();

    console.timeEnd('Time Taken');
    return rval;
  },
  2: () => {
    const rval = signalDecoder.getModifiedDecodedMessage();

    console.timeEnd('Time Taken');
    return rval;
  }
}
