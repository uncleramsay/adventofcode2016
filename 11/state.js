const _ = require('lodash');
const Elevator = require('./elevator');

module.exports = class State {
  constructor(elevatorFloor, floors) {
    this.elevator = new Elevator(elevatorFloor);
    this.floors = floors;
  }

  isFinal() {
    return this.floors[0].getContents().length === 0 &&
           this.floors[1].getContents().length === 0 &&
           this.floors[2].getContents().length === 0;
  }

  isValid() {
    let valid = true;

    _.each(this.floors, (floor) => {
      const contents = floor.getContents();
      const generators = _.filter(contents, (item) => {
        return item[1] === 'G';
      });
      const microchips = _.filter(contents, (item) => {
        return item[1] === 'M';
      });

      _.each(microchips, (microchip) => {
        const element = microchip[0];
        if (generators.length && generators.indexOf(element + 'G') === -1) {
          valid = false;
        }
      });
    });

    return valid;
  }

  getBranches() {
    const elevatorFloor = this.elevator.getFloor();
    const movableItems = this.floors[elevatorFloor].getContents();

    let branches = [];
    if (elevatorFloor !== 3) {
      const offset = 1;
      for (let i = 0; i < movableItems.length; i++) {
        const item1 = movableItems[i];
        for (let j = i + 1; j < movableItems.length; j++) {
          const item2 = movableItems[j];
          branches.push(this.getBranch(offset, item1, item2));
        }
        branches.push(this.getBranch(offset, item1));
      }
    }
    if (elevatorFloor !== 0) {
      const offset = -1;
      for (let i = 0; i < movableItems.length; i++) {
        const item1 = movableItems[i];
        for (let j = i + 1; j < movableItems.length; j++) {
          const item2 = movableItems[j];
          branches.push(this.getBranch(offset, item1, item2));
        }
        branches.push(this.getBranch(offset, item1));
      }
    }

    return branches;
  }

  getBranch(offset, item1, item2) {
    const elevatorFloor = this.elevator.getFloor();

    let newFloors = _.cloneDeep(this.floors);
    newFloors[elevatorFloor].removeItem(item1);
    newFloors[elevatorFloor + offset].addItem(item1);
    if (item2) {
      newFloors[elevatorFloor].removeItem(item2);
      newFloors[elevatorFloor + offset].addItem(item2);
    }

    return new State(elevatorFloor + offset, newFloors);
  }

  print() {
    _.each(this.floors, (floor) => {
      console.log(floor.getContents());
    });
    console.log();
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

