const evaluate = (input) => {
  if (!input.length) return NaN;
  const cleanExpression = input.trim().split(' ');
  const stack = [];
  const string = [];
  const values = {
    '-': 1,
    '+': 1,
    '/': 2,
    '*': 2,
  };

  // add opeartors to the stack and operands to the string
  for (let expression of cleanExpression) {
    if (isNaN(expression)) {
      while (values[expression] <= values[stack[stack.length - 1]]) {
        const operator = stack.pop();
        string.push(operator);
      }
      stack.push(expression);
      // if (values[expression] <= values[stack[stack.length - 1]]) {
      //   const operator = stack.pop();
      //   string.push(operator);
      //   stack.push(expression);
      // } else {
      //   stack.push(expression);
      // }
    } else {
      string.push(expression);
    }
  }

  // dump the stack
  while (stack.length) {
    const operator = stack.pop();
    string.push(operator);
  }

  console.log('string', string);

  for (let expression of string) {
    console.log('expression', expression);
    if (isNaN(expression)) {
      let result;
      let top = stack.pop();
      let bottom = stack.pop();
      switch (expression) {
        case '+':
          result = bottom + top;
          break;
        case '-':
          // result = bottom - top;
          result = bottom - top;
          break;
        case '*':
          result = bottom * top;
          break;
        case '/':
          result = bottom / top;
          break;
        default:
          break;
      }
      stack.push(result);
    } else {
      stack.push(Number(expression));
    }
    console.log(stack);
  }
  return String(stack[0]);
};

// console.log(evaluate('18 - 6 + 2 - 8 + 1 - 7'));
// console.log(evaluate('3 - 5 * 5 + 2'));
// console.log(evaluate('3 - 3 + 4 - 7'));
// console.log(evaluate('18 - 6 + 2 - 8 + 1 - 7'));
console.log(evaluate('5 * 6 + 2 / 4'));
