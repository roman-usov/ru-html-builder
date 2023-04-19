export default class {
  constructor(name, attributes = {}, body = '', children = []) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
    this.children = children;
  }

  toString() {
    console.log(`children inside paired for ${this.name}`, JSON.stringify(this.children));

    const value = this.children.length > 0 ? this.children.join('') : this.body;

    console.log(`value inside paired for ${this.name}`, value);

    return `<${this.name}${this.getAttributesAsLine()}>${value}</${this.name}>`;
  }

  getAttributesAsLine() {
    return Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');
  }
}
