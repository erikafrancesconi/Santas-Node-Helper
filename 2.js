const fs = require('fs');

fs.readFile('./2.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  // https://adventofcode.com/2015/day/2
  console.time('2');

  const packs = data.toString('utf-8').split('\n');

  const totalPaper = packs.reduce((acc, pack) => {
    const sizes = pack.split('x');
    const l = sizes[0];
    const w = sizes[1];
    const h = sizes[2];
    sizes.sort((a, b) => a - b);
    const paperNeeded = 2*l*w + 2*w*h + 2*h*l;
    const extra = sizes[0]*sizes[1];
    return acc + paperNeeded + extra;
  }, 0);
  console.log(`Total paper needed: ${totalPaper} square feet`);

  const totalRibbon = packs.reduce((acc, pack) => {
    const sizes = pack.split('x');
    sizes.sort((a, b) => a - b);
    const ribbonNeeded = sizes[0]*2 + sizes[1]*2;
    const extra = sizes[0]*sizes[1]*sizes[2];
    return acc + ribbonNeeded + extra;
  }, 0);
  console.log(`Total ribbon needed: ${totalRibbon} feet`);

  console.timeEnd('2');
})