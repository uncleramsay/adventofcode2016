const _ = require('lodash');

module.exports = class Controller {
  constructor() {
  }

  parseLocations(data) {
    const lines = data.split('\n');
    this.map = _.map(lines, (line) => {
      const matches = line.match(/(generator|microchip)/g);
      return matches ? matches.length : 0;
    });
  }

  calculateMoves() {
    let moves = 0;
    let currentFloor = 0;
    let finished = false;

    while (!finished) {
      if (this.map[currentFloor] === 2) {
        // If there are only 2 on a floor, move both up
        this.map[currentFloor] -= 2;
        this.map[currentFloor + 1] += 2;
        moves += 1;
      } else if (this.map[currentFloor] >= 2) {
        // If there are more than two on a floor, move just one up (takes two moves)
        this.map[currentFloor] -= 1;
        this.map[currentFloor + 1] += 1;
        moves += 2;
      } else if (currentFloor < 3) {
        currentFloor += 1;
      } else {
        currentFloor = 0;
      }

      if (!this.map[0] && !this.map[1] && !this.map[2]) {
        finished = true;
      }
    }

    return moves;
  }
}

