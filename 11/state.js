const _ = require('lodash');
const Elevator = require('./elevator');
const Floor = require('./floor');

module.exports = class State {
  constructor(elevatorFloor, floorContents) {
    this.elevator = new Elevator(elevatorFloor);
    this.floors = [
      new Floor(0),
      new Floor(1),
      new Floor(2),
      new Floor(3),
    ];

    for (let i = 0; i < floorContents.length; i++) {
      _.each(floorContents[i], (item) => {
        this.floors[i].addItem(item);
      });
    }
  }

  estimateDistance() {
    return _.reduce(this.floors, (sum, floor, i) => {
      const floorChance = floor.getContents().length * 0.25;
      const distanceFromTop = this.floors.length - i - 1;
      return sum + (floorChance * distanceFromTop);
    }, 0);
  }

  getBranches() {
    let branches = [];
    const singleItems = _.clone(this.floors[this.elevator.getFloor()].getContents());
    const doubleItems = [];
    for (let i = 0; i < singleItems.length; i++) {
      for (let j = i + 1; j < singleItems.length; j++) {
        doubleItems.push([singleItems[i], singleItems[j]]);
      }
    }

    // todo
  }

  serialize() {
    const pairs = {};
    _.each(this.floors, (floor) => {
      _.each([...floor.getContents()], (item) => {
        const initial = item[0];
        if (!pairs[initial]) {
          pairs[initial] = [];
        }
        pairs[initial].push(floor.getNumber());
      });
    });

    // Key doesn't actually matter for reducing branches
    let serializedPairs = [];
    _.each(pairs, (values) => {
      serializedPairs.push(values.join(''));
    });

    return serializedPairs.join('-') + `-${this.elevator.getFloor()}`;
  }
}

