const _ = require('lodash');
const State = require('./state');

module.exports = class Controller {
  constructor(floors) {
    this.currentState = new State(0, floors);
    this.visitedStates = new Set();
  }
}

