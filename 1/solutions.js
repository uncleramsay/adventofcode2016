const fs = require('fs');
const _ = require('lodash');

const directions = ['N','E','S','W'];

class MapReader {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    };
    this.directionIndex = 0;
    this.history = [];
  }

  getPosition() {
    return this.position;
  }

  getHeading() {
    return directions[this.directionIndex];
  }

  parseInstructions(instructions) {
    this.instructions = instructions.split(', ');
  }

  followInstructions() {
    _.each(this.instructions, (instruction) => {
      this._updatePosition(instruction);
    });
  }

  followInstructionsUntilSamePosition() {
    _.each(this.instructions, (instruction) => {
      if (this._updatePositionIncrementallyAndCheckHistory(instruction)) {
        return false;
      }
    });
  }

  getDistanceFromStart() {
    return Math.abs(this.position.x) + Math.abs(this.position.y);
  }

  _updatePosition(instruction) {
    this.directionIndex = this._updateDirectionIndex(instruction);

    const distance = parseInt(instruction.substr(1), 10);
    switch (this.getHeading()) {
      case 'N':
        this.position.y += distance;
        break;

      case 'E':
        this.position.x += distance;
        break;

      case 'S':
        this.position.y -= distance;
        break;

      case 'W':
        this.position.x -= distance;
        break;
    }
  }

  _updatePositionIncrementallyAndCheckHistory(instruction) {
    this.directionIndex = this._updateDirectionIndex(instruction);

    const distance = parseInt(instruction.substr(1), 10);
    for (let i = 0; i < distance; i++) {
      switch (this.getHeading()) {
        case 'N':
          this.position.y += 1;
          break;

        case 'E':
          this.position.x += 1;
          break;

        case 'S':
          this.position.y -= 1;
          break;

        case 'W':
          this.position.x -= 1;
          break;
      }

      const positionJson = JSON.stringify(this.position);
      if (this.history.indexOf(positionJson) > -1) {
        return true;
      }

      this.history.push(positionJson);
    }

    return false;
  }

  _updateDirectionIndex(instruction) {
    switch (instruction[0]) {
      case 'R':
        return (this.directionIndex + 1) < directions.length ?
          this.directionIndex + 1 :
          0;

      case 'L':
        return (this.directionIndex - 1) >= 0 ?
          this.directionIndex - 1 :
          directions.length -1;
    }
  }
}

const data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8').trim();

const mapReader = new MapReader();
mapReader.parseInstructions(data);

module.exports = {
  1: () => {
    mapReader.followInstructions();
    return mapReader.getDistanceFromStart();
  },
  2: () => {
    mapReader.followInstructionsUntilSamePosition();
    return mapReader.getDistanceFromStart();
  }
}
