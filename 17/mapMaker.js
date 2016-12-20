const _ = require('lodash');
const md5 = require('md5');
const Step = require('./step');

module.exports = class MapMaker {
  constructor(passcode) {
    this.passcode = passcode;
    this.steps = [];
    this.routes = [];
  }

  navigateTo(destX, destY) {
    return this._navigateHelper(destX, destY, true);
  }

  navigateToLongest(destX, destY) {
    return this._navigateHelper(destX, destY);
  }

  _navigateHelper(destX, destY, shortest) {
    this.steps.push(new Step(0, 0, ''));

    while (this.steps.length) {
      const step = this.steps.pop();

      if (step.isAt(destX, destY)) {
        if (shortest) {
          return step.route;
        }

        this.routes.push(step.route);
        continue;
      }

      const doors = this.roomDoorStatus(step.route, step.x, step.y);
      let branches = [];
      if (doors.up) {
        branches.push(new Step(step.x, step.y - 1, step.route + 'U'));
      }
      if (doors.down) {
        branches.push(new Step(step.x, step.y + 1, step.route + 'D'));
      }
      if (doors.left) {
        branches.push(new Step(step.x - 1, step.y, step.route + 'L'));
      }
      if (doors.right) {
        branches.push(new Step(step.x + 1, step.y, step.route + 'R'));
      }

      branches = _.filter(branches, (branch) => {
        return this.steps.indexOf(branch) === -1;
      });

      this.steps.unshift(...branches);
    }

    // All routes found, return longest length
    const routeLengths = _.map(this.routes, (route) => {
      return route.length;
    }).sort((a, b) => {
      return parseInt(a, 10) - parseInt(b, 10);
    }).reverse();

    return routeLengths[0];
  }

  roomDoorStatus(route, x, y) {
    const key = this.passcode + route;
    const hash = md5(key);
    const regex = /[b-f]/;
    return {
      up: regex.test(hash[0]) && y > 0,
      down: regex.test(hash[1]) && y < 3,
      left: regex.test(hash[2]) && x > 0,
      right: regex.test(hash[3]) && x < 3,
    };
  }

}
