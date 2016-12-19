const _ = require('lodash');

module.exports = class Step {
  constructor(x, y, previousStep) {
    this.x = x;
    this.y = y;
    this.previousStep = previousStep;
  }

  isAt(x, y) {
    return x === this.x && y === this.y;
  }

  getBranches() {
    return [
      new Step(this.x+1, this.y,   this),
      new Step(this.x-1, this.y,   this),
      new Step(this.x,   this.y+1, this),
      new Step(this.x,   this.y-1, this),
    ];
  }
}
