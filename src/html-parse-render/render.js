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

function buildAttributesStr(attrs) {
  return Object.entries(attrs)
    .reduce((acc, [attrName, attrValue]) => `${acc}${attrName}="${attrValue}" `, ' ')
    .trimEnd();
}

function render(ast) {
  const { name, attributes, body, children } = ast;

  const elAttributes = buildAttributesStr(attributes);

  if (singleTagsList.has(name)) {
    return `<${name}${elAttributes}>`;
  }

  const content = children.length > 0 ? children.map(render).join('') : body;

  return `<${name}${elAttributes}>${content}</${name}>`;
}

export default render;
