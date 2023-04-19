import SingleTag from './SingleTag.js';
import PairedTag from './PairedTag.js';

const singleTagsList = new Set(['hr', 'br', 'img']);
export default (name, ...properties) => {
  const CurrentClass = singleTagsList.has(name) ? SingleTag : PairedTag;

  console.log('built tag', JSON.stringify(new CurrentClass(name, ...properties)));

  return new CurrentClass(name, ...properties);
};
