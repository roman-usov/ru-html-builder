export default class {
  constructor(name, attributes = {}) {
    this.name = name;
    this.attributes = attributes;
  }

  toString() {
    return `<${this.name}${this.getAttributesAsLine()}>`;
  }

  getAttributesAsLine() {
    return Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');
  }
}
