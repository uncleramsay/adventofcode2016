const _ = require('lodash');

module.exports = class TileFinder {
  constructor() {
    this.tiles = [];
  }

  parseFirstRow(row) {
    this.tiles.push(row.split(''));
  }

  addRows(count) {
    for (let i = 0; i < count; i++) {
      const rowNum = this.tiles.length;
      let row = [];

      for (let j = 0; j < this.tiles[rowNum-1].length; j++) {
        row.push(this.isTrapCell(rowNum, j) ? '^' : '.');
      }

      this.tiles.push(row);
    }

    this.printTiles();
  }

  countSafeTiles() {
    let count = 0;
    _.each(this.tiles, (row) => {
      _.each(row, (cell) => {
        count += cell === '.' ? 1 : 0;
      });
    });

    return count;
  }

  isTrapCell(row, column) {
    let leftSafe, centreSafe, rightSafe;

    if (column === 0) {
      leftSafe = true;
    } else {
      const leftCell = this.tiles[row - 1][column - 1];
      leftSafe = leftCell === '.';
    }

    const centreCell = this.tiles[row - 1][column];
    centreSafe = centreCell === '.';

    if (column === this.tiles[row - 1].length - 1) {
      rightSafe = true;
    } else {
      const rightCell = this.tiles[row - 1][column + 1];
      rightSafe = rightCell === '.';
    }

    return ((!leftSafe && !centreSafe && rightSafe) ||
           (leftSafe && !centreSafe && !rightSafe) ||
           (!leftSafe && centreSafe && rightSafe) ||
           (leftSafe && centreSafe && !rightSafe));
  }

  printTiles() {
    _.each(this.tiles, (row) => {
      console.log(row.join(''));
    });
  }
}
