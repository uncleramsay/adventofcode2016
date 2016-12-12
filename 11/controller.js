const _ = require('lodash');
const Floor = require('./floor');
const State = require('./state');

module.exports = class Controller {
  constructor(floorContents) {
    let floors = [];

    for (let i = 0; i < floorContents.length; i++) {
      const floor = new Floor(i);
      _.each(floorContents[i], (item) => {
        floor.addItem(item);
      });
      floors.push(floor);
    }

    this.currentState = new State(0, floors);
  }

  bfs() {
    const visitedStates = {};
    const queue = [{
      last: null,
      current: this.currentState,
    }];

    let node;
    while(queue.length) {
      node = queue.pop();

      if (node.isFinal()) {
        const steps = [];
        while (node) {
          steps.push(node.current);
          node = node.last;
        }
        return steps.reverse();
      }

      let branches = state.getBranches();
      branches = _.filter(branches, (branch) => {
        const serial = branch.serialize();
        return !visitedStates[serial] &&
               branch.isValid();
      });
    }
  }
}

