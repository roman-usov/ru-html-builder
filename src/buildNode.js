import PairedTag from './PairedTag.js';
import SingleTag from './SingleTag.js';

const singleTagsList = new Set([
  'hr',
  'img',
  'br',
  'area',
  'base',
  'col',
  'command',
  'embed',
  'input',
  'keygen',
  'link',
  'param',
  'track',
  'wbr',
]);

const buildTagController = [
  {
    checkIfSingleTag: (name) => singleTagsList.has(name),
    buildTag: (name, attributes) => new SingleTag(name, attributes),
  },
  {
    checkIfSingleTag: (name) => !singleTagsList.has(name),
    buildTag: (name, attributes, body, children) => new PairedTag(name, attributes, body, children),
  },
];

const getNodeBuilder = (propertyName) =>
  buildTagController.find(({ checkIfSingleTag }) => checkIfSingleTag(propertyName));

export default function buildNode(name, attributes, body, children) {
  const { buildTag } = getNodeBuilder(name);

  const processedChildren =
    children.length > 0
      ? children.map((tag) => {
          if (tag instanceof SingleTag || tag instanceof PairedTag) return tag;
          return buildNode(tag.name, tag.attributes, tag.body, tag.children);
        })
      : children;

  return buildTag(name, attributes, body, processedChildren);
}

const expected = new PairedTag('html', {}, '', [
  new PairedTag('head', {}, '', [new PairedTag('title', {}, 'hello, hexlet!')]),
  new PairedTag('body', {}, '', [
    new PairedTag('h1', { class: 'header' }, 'html builder example'),
    new PairedTag('div', {}, '', [new PairedTag('span', {}, 'span text'), new SingleTag('hr')]),
  ]),
]);

// console.log('expected node', JSON.stringify(expected));
