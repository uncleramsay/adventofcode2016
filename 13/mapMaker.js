const _ = require('lodash');
const Step = require('./step');

module.exports = class MapMaker {
  constructor(favouriteNumber) {
    this.favouriteNumber = favouriteNumber;
    this.steps = [];
  }

  navigateTo(destX, destY) {
    this.steps.push(new Step(1, 1, null));

    while (this.steps.length) {
      const step = this.steps.pop();

      if (step.isAt(destX, destY)) {
        this.printRoute(destX, destY, step);
        return this.countSteps(step);
      }

      // Give up if we go out of range
      if (step.x > 0 && step.x <= destX + 10 &&
          step.y > 0 && step.y <= destY + 10) {
        const branches = _.filter(step.getBranches(), (branch) => {
          return this.isOpenSpace(step.x, step.y) &&
                 !_.find(this.steps, (step) => { return step.x === branch.x && step.y === branch.y; });
        });

        this.steps.unshift(...branches);
      }
    }
  }

  navigateUntil(limit) {
    let routes = 0;
    this.steps.push(new Step(1, 1, null));

    while (this.steps.length) {
      const step = this.steps.pop();

      if (this.countSteps(step) === limit) {
        routes += 1;
      }

      // Stop when we're likely to be done - there's probably a better stopping method than this...
      if (this.countSteps(step) === limit * 2) {
        return routes;
      }

      // Give up if we go out of range
      if (step.x > 0 &&
          step.y > 0) {
        const branches = _.filter(step.getBranches(), (branch) => {
          return this.isOpenSpace(step.x, step.y) &&
                 !_.find(this.steps, (step) => { return step.x === branch.x && step.y === branch.y; });
        });

        this.steps.unshift(...branches);
      }
    }
  }

  countSteps(step) {
    let count = 0;
    while(step.previousStep !== null) {
      count += 1;
      step = step.previousStep;
    }

    return count;
  }

  printRoute(destX, destY, step) {
    let route = [];
    while (step.previousStep !== null) {
      route.unshift(step);
      step = step.previousStep;
    }

    console.log('\x1Bc');
    process.stdout.cursorTo(0, 0);
    process.stdout.clearLine();
    this.printMap(destX + 10, destY + 10);

    _.each(route, (step) => {
      process.stdout.cursorTo(step.x + 3, step.y + 3);
      process.stdout.write('@');
    });

    process.stdout.cursorTo(0, destY + 15);
  }

  printMap(maxX, maxY) {
    // Header rows
    let row = '   ';
    for (let x = 0; x <= maxX; x++) {
      row += x < 10 ? '0' : x.toString()[0];
    }
    console.log(row);
    row = '   ';
    for (let x = 0; x <= maxX; x++) {
      row += x < 10 ? x : x.toString()[1];
    }
    console.log(row);
    console.log();

    for (let y = 0; y <= maxY; y++) {
      row = y < 10 ? '0'+y : y;
      row += ' ';

      for (let x = 0; x <= maxX; x++) {
        row += this.isOpenSpace(x, y) ? ' ' : '#';
      }

      console.log(row);
    }
  }

  isOpenSpace(x, y) {
    let sum = x*x + 3*x + 2*x*y + y + y*y;
    sum += this.favouriteNumber;

    const binary = sum.toString(2);
    let count = 0;
    _.each(binary, (char) => {
      count += char === '1' ? 1 : 0;
    });

    return count % 2 === 0;
  }
}
