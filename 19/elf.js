const _ = require('lodash');

module.exports = class Elf {
  constructor(prev, next, numberOfElves) {
    this.prevIndex = prev;
    this.nextIndex = next;
    this.value = 1;
  }

  getPrevIndex() {
    return this.prevIndex;
  }

  setPrevIndex(prev) {
    this.prevIndex = prev;
  }

  getNextIndex() {
    return this.nextIndex;
  }

  setNextIndex(next) {
    this.nextIndex = next;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }
}
