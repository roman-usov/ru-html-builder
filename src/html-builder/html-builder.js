const propertyTypes = [
  {
    name: 'body',
    check: (property) => typeof property === 'string',
  },
  {
    name: 'attributes',
    check: (property) => property instanceof Object && !(property instanceof Array),
  },
  {
    name: 'children',
    check: (property) => property instanceof Array,
  },
];

function getPropertyName(property) {
  const propertyType = propertyTypes.find(({ check }) => check(property));
  return propertyType.name;
}

function buildAttrStr(attrData) {
  return Object.entries(attrData).reduce((acc, [name, value]) => `${acc}${name}="${value}" `, ' ').trimEnd();
}

function buildHtml (sourceData) {
    const [tagName, ...properties] = sourceData;
    
    const root = {
      name: tagName,
      body: '',
      attributes: {},
      children: [],
    }
    
    const element = properties.reduce((acc, property) => ({ ...acc, [getPropertyName(property)]: property }), root);
    
    const elName = element.name;
    const elBody = element.body;
    const elAttributes = buildAttrStr(element.attributes);
    const elChildren = element.children.map(buildHtml).join('');
    
    return `<${elName}${elAttributes}>${elBody}${elChildren}</${elName}>`;
}

export default buildHtml;
