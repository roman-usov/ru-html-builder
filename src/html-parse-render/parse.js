import identity from 'lodash.identity';

const propertyTypes = [
  {
    type: 'body',
    check: (property) => typeof property === 'string',
    process: identity,
  },
  {
    type: 'attributes',
    check: (property) => property instanceof Object && !(property instanceof Array),
    process: identity,
  },
  {
    type: 'children',
    check: (property) => property instanceof Array,
    process: (children, fn) => children.map(fn),
  },
];

function getPropertyType(property) {
  // const propertyInfo = propertyTypes.find((propertyType) => propertyType.check(property));
  // return propertyInfo.type;

  return propertyTypes.find((propertyType) => propertyType.check(property));
}

function parse(data) {
  const [tagName, ...properties] = data;

  const root = {
    name: tagName,
    attributes: {},
    body: '',
    children: [],
  };

  // return properties.reduce((acc, property) => {
  //   const propertyType = getPropertyType(property);
  //   return { ...acc, [propertyType]: propertyType === 'children' ? property.map(parse) : property };
  // }, root);

  return properties.reduce((acc, property) => {
    const { type, process } = getPropertyType(property);

    return { ...acc, [type]: process(property, parse) };
  }, root);
}

export default parse;
