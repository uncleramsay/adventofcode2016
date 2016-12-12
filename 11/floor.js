module.exports = class Floor {
  constructor(number) {
    this.number = number;
    this.contents = [];
  }

  getNumber() {
    return this.number;
  }

  getContents() {
    return this.contents;
  }

  addItem(item) {
    this.contents.push(item);
  }

  removeItem(item) {
    const index = this.contents.indexOf(item);
    if (index > -1) {
      this.contents.splice(index, 1);
    }
  }
}

