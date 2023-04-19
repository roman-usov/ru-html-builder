export default class PairedTag {
  constructor(name, attributes, body, children) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
    if (children && children.length > 0) {
      this.children = children;
    }
  }

  #buildAttributes() {
    return Object.entries(this.attributes)
      .reduce((acc, [name, value]) => `${acc}${name}="${value}" `, ' ')
      .trimEnd();
  }

  #buildContent() {
    return this.children ? this.children.map((node) => node.toString()).join('') : this.body;
  }

  toString() {
    return `<${this.name}${this.#buildAttributes()}>${this.#buildContent()}</${this.name}>`;
  }
}

const name = 'html';
const attributes = { id: 123, class: 'html' };
const body = '';
const children = [
  {
    name: 'div',
    attributes: { class: 'div-wrapper' },
    body: 'first div',
    children: [],
  },
  {
    name: 'p',
    attributes: { class: 'text' },
    body: 'hello, hello',
    children: [],
  },
];

// const pairedTag = new PairedTag(name, attributes, body);
// console.log(JSON.stringify(pairedTag));
// console.log(pairedTag.toString());
