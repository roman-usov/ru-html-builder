export default class SingleTag {
  constructor(name, attributes) {
    this.name = name;
    if (attributes && Object.keys(attributes).length !== 0) {
      this.attributes = attributes;
    }
  }

  #buildAttributes() {
    return Object.entries(this.attributes)
      .reduce((acc, [name, value]) => `${acc}${name}="${value}" `, ' ')
      .trimEnd();
  }

  toString() {
    return `<${this.name}${this.attributes ? this.#buildAttributes() : ''}>`;
  }
}

const name = 'br';
const attributes = { id: 123, class: 'br-class' };

const singleTag = new SingleTag(name, {});
// console.log(singleTag);
// console.log(singleTag.toString());
