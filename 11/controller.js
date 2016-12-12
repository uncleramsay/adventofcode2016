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
    const visitedStates = new Set();
    const queue = [{
      last: null,
      current: this.currentState,
    }];

    let node;
    let count = 0;
    while(queue.length) {
      node = queue.pop();

      if (node.current.isFinal()) {
        const steps = [];
        while (node) {
          steps.push(node.current);
          node = node.last;
        }

        _.each(steps.reverse(), (step) => {
          if (step) {
            step.print();
          }
        });
        return steps.length;
      }

      let branches = node.current.getBranches();
      branches = _.filter(branches, (branch) => {
        const serial = branch.serialize();
        if (!visitedStates.has(serial) &&
            branch.isValid()) {
          visitedStates.add(serial);
          return true;
        }
        return false;
      });
      _.each(branches, (branch) => {
        queue.push({
          last: node,
          current: branch,
        });
      });

      count += 1;
    }
  }
}

