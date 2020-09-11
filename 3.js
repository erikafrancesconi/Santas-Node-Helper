// TODO: please clean this ugly code
const fs = require('fs');

fs.readFile('./3.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  // https://adventofcode.com/2015/day/3
  console.time('3');
  const arr = data.toString('utf-8').split('');

  let matrix = {
    0: {
      0: 1
    }
  };
  let matrix2 = {
    'santa' : {
      0: {
        0: 1
      }
    },
    'robot' : {
      0: {
        0: 1
      }
    }
  }

  let x = 0, y = 0;
  let xs = 0, ys = 0, xr = 0, yr = 0;
  arr.forEach((val, idx) => {
    // 1
    switch(val) {
      case '^':
        y += 1;
        break;
      case 'v':
        y -=1;
        break;
      case '>':
        x += 1;
        break;
      case '<':
        x -= 1;
        break;
    }
    if (typeof matrix[x] === 'undefined') {
      matrix[x] = {};
    }
    if (typeof matrix[x][y] === 'undefined') {
      matrix[x][y] = 0;
    }
    matrix[x][y] +=1;

    // 2
    if (idx % 2 === 0) {
      switch(val) {
        case '^':
          ys += 1;
          break;
        case 'v':
          ys -=1;
          break;
        case '>':
          xs += 1;
          break;
        case '<':
          xs -= 1;
          break;
      }
      if (typeof matrix2['santa'][xs] === 'undefined') {
        matrix2['santa'][xs] = {};
      }
      if (typeof matrix2['santa'][xs][ys] === 'undefined') {
        matrix2['santa'][xs][ys] = 0;
      }
      matrix2['santa'][xs][ys] +=1;
    } else {
      switch(val) {
        case '^':
          yr += 1;
          break;
        case 'v':
          yr -=1;
          break;
        case '>':
          xr += 1;
          break;
        case '<':
          xr -= 1;
          break;
      }
      if (typeof matrix2['robot'][xr] === 'undefined') {
        matrix2['robot'][xr] = {};
      }
      if (typeof matrix2['robot'][xr][yr] === 'undefined') {
        matrix2['robot'][xr][yr] = 0;
      }
      matrix2['robot'][xr][yr] +=1;
    }
  });
  
  let housesServed = 0;
  for (let obj in matrix) {
    housesServed += Object.keys(matrix[obj]).length;
  }
  console.log(`Houses with presents: ${housesServed}`);

  housesServed = 0;
  const { santa, robot } = matrix2;
  for (let obj1 in santa) {
    housesServed += Object.keys(santa[obj1]).length;
  }
  for (let obj2 in robot) {
    const keys = Object.keys(robot[obj2]);
    if (typeof santa[obj2] !== 'undefined') {
      const sKeys = Object.keys(santa[obj2]);
      keys.forEach(val => {
        if (!sKeys.includes(val)) {
          housesServed += 1;
        }
      })
    } else {
      housesServed += keys.length;
    }
  }
  console.log(`Houses with presents (with robot): ${housesServed}`);

  console.timeEnd('3');
})