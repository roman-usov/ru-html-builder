import parse from './src/html-parse-render/parse.js';
import render from './src/html-parse-render/render.js';
import buildHtml from './src/html-builder/html-builder.js';

const htmlData = [
  'html',
  [
    ['head', [['title', 'hello, hexlet!']]],
    [
      'body',
      { class: 'container' },
      [
        ['h1', { class: 'header' }, 'html builder example'],
        [
          'div',
          [
            ['span', 'This is a span.'],
            ['span', { class: 'text', id: 'uniq-key' }, 'This is yet another span.'],
          ],
        ],
      ],
    ],
  ],
];

const htmlData2 = [
  'html',
  [
    ['meta', { id: 'uniq-key', class: 'test-class' }, [['title', 'hello, hexlet!']]],
    ['body', [['br']]],
  ],
];

const astExample = {
  name: 'html',
  attributes: {},
  body: '',
  children: [
    {
      name: 'meta',
      attributes: { id: 'uniq-key', class: 'test-class' },
      body: '',
      children: [{ name: 'title', attributes: {}, body: 'hello, hexlet!', children: [] }],
    },
    {
      name: 'body',
      attributes: {},
      body: '',
      children: [{ name: 'br', attributes: {}, body: '', children: [] }],
    },
  ],
};

console.log('ast example', JSON.stringify(astExample));

// const htmlFromDsl = buildHtml(htmlData);
// console.log(htmlFromDsl);

const ast = parse(htmlData2);
console.log(JSON.stringify(ast));

console.log(render(ast));
