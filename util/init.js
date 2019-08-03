const path = require('path');

module.exports = async function(pastec) {
  console.log('init pastec ...');
  await pastec.add(path.join(__dirname, '../public/image/1.jpg'), 1);
  await pastec.add(path.join(__dirname, '../public/image/2.jpg'), 2);
  console.log('init pastec success');
}
