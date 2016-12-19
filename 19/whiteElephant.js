const _ = require('lodash');
const Elf = require('./elf');

module.exports = class WhiteElephant {
  constructor(numberOfElves) {

    this.elves = [];
    for (let i = 0; i < numberOfElves; i++) {
      const elf = new Elf(i - 1, i + 1);
      this.elves.push(elf);
    }
    this.oppositeIndex = Math.floor(numberOfElves / 2);

    this.elves[0].setPrevIndex(this.elves.length - 1);
    this.elves[this.elves.length - 1].setNextIndex(0);
  }

  play() {
    let currentElfIndex = 0;
    let finished = false;

    while (!finished) {
      const elf = this.elves[currentElfIndex];
      const nextElf = this.elves[elf.getNextIndex()];

      const val = elf.getValue();
      const nextVal = nextElf.getValue();

      elf.setValue(val + nextVal);
      nextElf.setValue(0);

      elf.setNextIndex(nextElf.getNextIndex());

      if (this.elves[elf.getNextIndex()] === elf) {
        finished = true;
      } else {
        currentElfIndex = elf.getNextIndex();
      }
    }
  }

  playWithOppositeRules() {
    let currentElfIndex = 0;
    let finished = false;
    let counter = 0;

    while (!finished) {
      const elf = this.elves[currentElfIndex];
      const nextElf = this.elves[this.oppositeIndex];

      const val = elf.getValue();
      const nextVal = nextElf.getValue();

      elf.setValue(val + nextVal);
      nextElf.setValue(0);
      this.elves[nextElf.getPrevIndex()].setNextIndex(nextElf.getNextIndex());
      this.elves[nextElf.getNextIndex()].setPrevIndex(nextElf.getPrevIndex());

      const offset = (counter % 2 === 0) ? 2 : 1;
      let potentialOppositeIndex = this.oppositeIndex + offset;
      if (potentialOppositeIndex >= this.elves.length) {
        potentialOppositeIndex -= this.elves.length;
      }
      this.oppositeIndex = this.getNextValidIndex(potentialOppositeIndex);

      if (this.elves[elf.getNextIndex()] === elf) {
        console.log('done');
        finished = true;
      } else {
        if (counter > 3000000) {
          console.log(elf);
        }
        currentElfIndex = elf.getNextIndex();
      }

      if (counter % 10000 === 0) {
        console.log(counter);
      }

      // const nextValidIndex = this.getNextValidIndex(elf.getNextIndex());
      // if (counter > 3000000) {
      //   console.log(`${currentElfIndex} === ${nextValidIndex}`);
      //   console.log(this.oppositeIndex);
      //   console.log(this.elves[nextValidIndex]);
      //   console.log(this.elves[this.elves[nextValidIndex].getNextIndex()]);
      // }
      // if (nextValidIndex === currentElfIndex) {
      //   finished = true;
      //   console.log('done');
      // }
      // currentElfIndex = nextValidIndex;

      counter += 1;
    }
  }

  getNextValidIndex(index) {
    let nextElf = this.elves[index];
    while(nextElf.getValue() === 0) {
      index = nextElf.getNextIndex();
      nextElf = this.elves[index];
    }

    return index;
  }

  getWinner() {
    console.log('in');
    for (let i = 0; i < this.elves.length; i++) {
      if (this.elves[i].getValue() > 0) {
        return i + 1;
      }
    }

    throw 'Couldn\'t determine winner';
  }
}
