const _ = require('lodash');

module.exports = class Step {
  constructor(x, y, route) {
    this.x = x;
    this.y = y;
    this.route = route;
  }

  isAt(x, y) {
    return x === this.x && y === this.y;
  }
}
