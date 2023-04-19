import identity from 'lodash.identity';
import buildNode from './buildNode.js';

const data = [
  'html',
  [
    ['head', [['title', 'hello, hexlet!']]],
    // [
    //   'body',
    //   [
    //     ['div', { class: 'separator' }],
    //     ['h1', { class: 'header' }, 'html builder example'],
    //     [
    //       'div',
    //       [
    //         ['img', { class: 'image', href: '#' }],
    //         ['span', 'span text2'],
    //       ],
    //     ],
    //   ],
    // ],
  ],
];

// const data = [
//   'html',
//   [
//     ['head', [['title', 'hello, hexlet!']]],
//     [
//       'body',
//       [
//         ['h1', { class: 'header' }, 'html builder example'],
//         ['div', [['span', 'span text'], ['hr']]],
//       ],
//     ],
//   ],
// ];

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
    check: (property) => property instanceof Object && !(property instanceof Array),
    process: identity,
  },
];

const getPropertyAction = (property) => propertyActions.find(({ check }) => check(property));

const parse = (data) => {
  const [tagName, ...properties] = data;
  const root = {
    name: tagName,
    attributes: {},
    body: '',
    children: [],
  };

  const tag = properties.reduce((acc, property) => {
    const { name, process } = getPropertyAction(property);
    return { ...acc, [name]: process(property, parse) };
  }, root);

  return buildNode(tag.name, tag.attributes, tag.body, tag.children);
};

export default parse;

const builtNodes = parse(data);
console.log('builtNodes', JSON.stringify(builtNodes));
console.log(builtNodes.toString());

// console.log(JSON.stringify(parse(dataExample)));
