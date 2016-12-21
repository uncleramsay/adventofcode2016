const _ = require('lodash');

module.exports = class Scrambler {
  constructor() {
    this.instructions = [];
  }

  parseInstructions(instructions) {
    this.instructions = instructions.split('\n');
  }

  scramble(password) {
    let matches;
    _.each(this.instructions, (instruction) => {

      matches = instruction.match(/^swap position (\d+) with position (\d+)$/);
      if (matches) {
        password = this._swapPosition(password, parseInt(matches[1], 10), parseInt(matches[2], 10));
        return;
      }

      matches = instruction.match(/^swap letter (\w) with letter (\w)$/);
      if (matches) {
        password = this._swapLetter(password, matches[1], matches[2]);
        return;
      }

      matches = instruction.match(/^rotate (left|right) (\d+) steps?$/);
      if (matches) {
        password = this._staticRotate(password, matches[1], parseInt(matches[2], 10));
        return;
      }

      matches = instruction.match(/^rotate based on position of letter (\w)$/);
      if (matches) {
        password = this._dynamicRotate(password, matches[1]);
        return;
      }

      matches = instruction.match(/^reverse positions (\d+) through (\d+)$/);
      if (matches) {
        password = this._reversePositions(password, parseInt(matches[1], 10), parseInt(matches[2], 10));
        return;
      }

      matches = instruction.match(/^move position (\d+) to position (\d+)$/);
      if (matches) {
        password = this._movePosition(password, parseInt(matches[1], 10), parseInt(matches[2], 10));
        return;
      }

      throw `Couldn't understand instruction '${instruction}'`;
    });

    return password;
  }

  unscramble(password) {
    let matches;
    const instructions = _.clone(this.instructions).reverse();
    _.each(instructions, (instruction) => {
      matches = instruction.match(/^swap position (\d+) with position (\d+)$/);
      if (matches) {
        password = this._swapPosition(password, parseInt(matches[1], 10), parseInt(matches[2], 10));
        return;
      }

      matches = instruction.match(/^swap letter (\w) with letter (\w)$/);
      if (matches) {
        password = this._swapLetter(password, matches[1], matches[2]);
        return;
      }

      matches = instruction.match(/^rotate (left|right) (\d+) steps?$/);
      if (matches) {
        const direction = (matches[1] === 'left') ? 'right' : 'left';
        password = this._staticRotate(password, direction, parseInt(matches[2], 10));
        return;
      }

      matches = instruction.match(/^rotate based on position of letter (\w)$/);
      if (matches) {
        password = this._undoDynamicRotate(password, matches[1]);
        return;
      }

      matches = instruction.match(/^reverse positions (\d+) through (\d+)$/);
      if (matches) {
        password = this._reversePositions(password, parseInt(matches[1], 10), parseInt(matches[2], 10));
        return;
      }

      matches = instruction.match(/^move position (\d+) to position (\d+)$/);
      if (matches) {
        password = this._movePosition(password, parseInt(matches[2], 10), parseInt(matches[1], 10));
        return;
      }

      throw `Couldn't understand instruction '${instruction}'`;
    });

    return password;
  }

  _swapPosition(password, x, y) {
    const min = Math.min(x, y);
    const max = Math.max(x, y);
    const regex = new RegExp(`^(.{${min}})(.)(.{${max-min-1}})(.)`);

    return password.replace(regex, '$1$4$3$2');
  }

  _swapLetter(password, x, y) {
    const placeholder = '#'; // Assumes alphanumeric passwords only

    const regex1 = new RegExp(`${x}`, 'g');
    const regex2 = new RegExp(`${y}`, 'g');
    const regex3 = new RegExp(`${placeholder}`, 'g');

    return password
      .replace(regex1, placeholder)
      .replace(regex2, x)
      .replace(regex3, y);
  }

  _staticRotate(password, direction, distance) {
    if (distance > password.length) {
      distance -= password.length;
    }

    if (direction === 'left') {
      return password.substr(distance) + password.substr(0, distance);
    }

    if (direction === 'right') {
      return password.substr(password.length - distance) + password.substr(0, password.length - distance);
    }

    throw `Couldn't understand direction '${direction}'`;
  }

  _dynamicRotate(password, x) {
    const index = password.indexOf(x);
    if (index === -1) {
      throw `Tried to rotate password '${password}' by letter ${x}`;
    }

    const distance = 1 + index + ((index >= 4) ? 1 : 0);
    return this._staticRotate(password, 'right', distance);
  }

  _undoDynamicRotate(password, x) {
    for (let i = 0; i < password.length; i++) {
      const distance = 1 + i + ((i >= 4) ? 1 : 0);
      const rotatedPassword = this._staticRotate(password, 'left', distance);
      if (rotatedPassword.substr(i, 1) === x) {
        return rotatedPassword;
      }
    }

    throw `Couldn't find dynamically rotated password`;
  }

  _reversePositions(password, x, y) {
    const pre = password.substr(0, x);
    const reverse = password.substr(x, y-x+1).split('').reverse().join('');
    const post = password.substr(y+1);

    return pre + reverse + post;
  }

  _movePosition(password, x, y) {
    let pre = password.substr(0, x);
    const char = password.substr(x, 1);
    let post = password.substr(x+1);

    password = pre + post;

    pre = password.substr(0, y);
    post = password.substr(y);

    return pre + char + post;
  }
}
