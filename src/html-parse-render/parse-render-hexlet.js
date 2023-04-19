import identity from 'lodash.identity';

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

export const render = (data) => {
  const { name, attributes, body, children } = data;
  const attrsLine = Object.keys(attributes)
    .map((key) => ` ${key}="${attributes[key]}"`)
    .join('');

  if (singleTagsList.has(name)) {
    return `<${name}${attrsLine}>`;
  }

  const content = children.length > 0 ? children.map(render).join('') : body;

  return `<${name}${attrsLine}>${content}</${name}>`;
};

const propertyActions = [
  {
    name: 'body',
    check: (property) => typeof property === 'string',
    process: identity,
  },
  {
    name: 'children',
    check: (property) => property instanceof Array,
    process: (children, f) => children.map(f),
  },
  {
    name: 'attributes',
    check: (property) => property instanceof Object,
    process: identity,
  },
];

const getPropertyAction = (property) => propertyActions.find(({ check }) => check(property));

export const parse = (data) => {
  const [tagName, ...properties] = data;
  const root = {
    name: tagName,
    attributes: {},
    body: '',
    children: [],
  };
  return properties.reduce((acc, property) => {
    const { name, process } = getPropertyAction(property);
    return { ...acc, [name]: process(property, parse) };
  }, root);
};
