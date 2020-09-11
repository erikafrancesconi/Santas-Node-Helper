const fs = require('fs');

fs.readFile('./3.txt', (err, data) => {
  if (err) {
    console.log('Whoops', err);
    return;
  }

  // https://adventofcode.com/2015/day/3
  console.time('3');
  const arr = data.toString('utf-8').split('');

  const count = (hasRobot=false) => {
    let matrix = {
      'santa' : {
        0: {
          0: 1
        }
      },
      'robot' : {}
    };

    if (hasRobot) {
      matrix['robot'] = {
        0: {
          0: 1
        }
      }
    }

    let x = 0, y = 0, xr = 0, yr = 0;
    arr.forEach((val, idx) => {
      if (!hasRobot || idx % 2 === 0) {
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
        if (typeof matrix['santa'][x] === 'undefined') {
          matrix['santa'][x] = {};
        }
        if (typeof matrix['santa'][x][y] === 'undefined') {
          matrix['santa'][x][y] = 0;
        }
        matrix['santa'][x][y] +=1;
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
        if (typeof matrix['robot'][xr] === 'undefined') {
          matrix['robot'][xr] = {};
        }
        if (typeof matrix['robot'][xr][yr] === 'undefined') {
          matrix['robot'][xr][yr] = 0;
        }
        matrix['robot'][xr][yr] +=1;
      }
    });
    let housesServed = 0;
    const { santa, robot } = matrix;
    for (let obj1 in santa) {
      housesServed += Object.keys(santa[obj1]).length;
    }
    if (hasRobot) {
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
    }
    return housesServed;
  }
  
  console.log(`Houses with presents: ${count()}`);
  console.log(`Houses with presents (with robot): ${count(true)}`);

  console.timeEnd('3');
})