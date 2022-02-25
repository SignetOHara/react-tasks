// Create a sum function that takes 3 parameters a, b and c. If the function was called with all three
// arguments, it should return their sum. If only a (or a and b) was passed, the sum function should
// return a function that rememebers the earlier passed arguments until all 3 arguments have been
// passed.

export const Task2 = () => {
  const sum = (a, b, c) => {
    if (!b) {
      return (b, c) => {
        if (!c) {
          return (c) => a + b + c;
        }
        return a + b + c;
      };
    }

    if (!c) {
      return (c) => a + b + c;
    }

    return a + b + c;
  };

  const sum1 = sum(1, 2, 3);
  // const sum2 = sum(8, 1)(12);
  // const sum3 = sum(6)(1, 4);
  // const sum4 = sum(10)(20)(30);

  // console.log(sum1);
  // console.log(sum2);
  // console.log(sum3);
  // console.log(sum4);

  return <div>{sum1}</div>;
};
