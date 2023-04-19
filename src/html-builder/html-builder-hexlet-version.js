// BEGIN
// Каждый элемент массива содержит имя свойства
// и функцию-предикат для определения типа этого свойства.
const propertyActions = [
  {
    name: 'body',
    check: (property) => typeof property === 'string',
  },
  {
    name: 'children',
    check: (property) => property instanceof Array,
  },
  {
    name: 'attributes',
    check: (property) => property instanceof Object,
  },
];

// Получаем имя свойства по его типу.
const getPropertyName = (property) => {
  const object = propertyActions.find(({ check }) => check(property));
  return object.name;
};

// Формируем строковое представление аттрибутов тега.
const buildAttrString = (attrs) => (
  Object.keys(attrs).map((key) => ` ${key}="${attrs[key]}"`).join('')
);

// Функция принимает на вход тег.
const buildHtml = (data) => {
  // Получаем имя тега и свойства тега (атрибуты, тело, детей) в виде массива.
  const [tagName, ...properties] = data;

  // Формируем представление тега в виде объекта.
  const root = {
    name: tagName,
    attributes: {},
    body: '',
    children: [],
  };

  // Обходим свойства тега.
  const tag = properties
    .reduce((acc, property) => {
      // Получаем имя свойства.
      const propertyName = getPropertyName(property);
      // Добавляем свойство в представление тега.
      return { ...acc, [propertyName]: property };
    }, root);

  // Из представления тега формируем строку,
  // вызывая рекурсивно функцию buildHtml для каждого ребёнка.
  return [
    `<${tag.name}${buildAttrString(tag.attributes)}>`,
    `${tag.body}${tag.children.map(buildHtml).join('')}`,
    `</${tag.name}>`,
  ].join('');
};

export default buildHtml;
// END
