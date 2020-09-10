const fs = require('fs');

fs.readFile('./1.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  // https://adventofcode.com/2015/day/1
  console.time('1');
  const instructions = data.toString('utf-8');

  let basementFound = false;
  const reduced = instructions.split('').reduce((acc, obj, idx) => {
    if (obj === '(') {
      acc++;
    } else {
      acc--;
    }
    if (!basementFound && acc === -1) {
      basementFound = true;
      console.log(`First touch on the basement at index ${idx+1}`);
    }
    return acc;
  }, 0);
  console.log(`Finishing on floor ${reduced}`);
  console.timeEnd('1');
  
})