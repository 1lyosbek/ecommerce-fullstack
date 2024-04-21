const arr = [
  {
    name: 'John',
    age: 25,
    hair: 'yellow',
  },
];

const obj = {
  name: 'John',
  age: 25,
  hair: 'yellow',
};

const foundBy = (param) => {
  const foundData = arr.find((item) => {
    let isCorrect = false;
    let index = 1;
    for (const key in param) {
      if (item[key] === param[key]) {
        if (index === 1) {
          isCorrect = true;
        } else if (index > 1 && !isCorrect) {
          isCorrect = false;
        }
      } else {
        isCorrect = false;
      }
      index += 1;
    }
    return isCorrect;
  });
  return foundData;
};

console.log(foundBy(obj));
