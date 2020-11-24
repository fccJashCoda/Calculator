import { useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

const Calculator = () => {
  const [operation, setOperation] = useState('');
  const [expression, setExpression] = useState('');
  const [currentOp, setCurrentOp] = useState('');
  const [temp, setTemp] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);

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

    for (let expression of cleanExpression) {
      if (isNaN(expression)) {
        while (values[expression] <= values[stack[stack.length - 1]]) {
          const operator = stack.pop();
          string.push(operator);
        }
        stack.push(expression);
      } else {
        string.push(expression);
      }
    }

    while (stack.length) {
      const operator = stack.pop();
      string.push(operator);
    }

    for (let expression of string) {
      console.log('expression', expression);
      if (isNaN(expression)) {
        let result;
        let first = stack.pop();
        let second = stack.pop();
        switch (expression) {
          case '+':
            result = second + first;
            break;
          case '-':
            result = first - second;
            break;
          case '*':
            result = second * first;
            break;
          case '/':
            result = second / first;
            break;
          default:
            break;
        }
        stack.push(result);
      } else {
        stack.push(Number(expression));
      }
    }

    return String(stack[0]);
  };

  const handleInput = (key) => {
    const operatorLogic = () => {
      if (operation[operation.length - 1] === '.') {
        return;
      }
      if (!temp && operation.length) {
        setCurrentOp(`${key}`);
        setOperation(`${operation}${key}`);
        setExpression(`${expression} ${key} `);
        setTemp(key);
      } else if (temp && temp[0] !== key && operation.length > 1) {
        setCurrentOp(`${key}`);
        setOperation(
          `${operation.slice(0, operation.length - temp.length)}${key}`
        );
        setExpression(
          `${expression.slice(0, expression.length - temp.length - 2)} ${key} `
        );
        setTemp(key);
      }
      setIsDecimal(false);
    };

    switch (key) {
      case 'C':
        setOperation('');
        setExpression('');
        setCurrentOp('');
        setTemp('');
        setIsDecimal(false);
        break;
      case '.':
        if (!isDecimal) {
          setCurrentOp(`${currentOp}${key}`);
          setOperation(`${operation}${key}`);
          setExpression(`${expression}${key}`);
          setIsDecimal(true);
        }
        break;
      case '+':
      case '/':
      case '*':
        operatorLogic();
        break;
      case '-':
        if (operation[operation.length - 1] === '.') {
          return;
        }
        if (!temp) {
          setTemp(key);
          setCurrentOp(`${key}`);
          setOperation(`${operation}${key}`);
          if (operation.length) {
            setExpression(`${expression} ${key} `);
          } else {
            setExpression(`${expression}${key}`);
          }
        } else if (temp && temp !== key && temp.length < 2) {
          setCurrentOp(`${key}`);
          setOperation(`${operation}${key}`);
          setExpression(`${expression}${key}`);
          setTemp(temp + key);
        }
        setIsDecimal(false);
        break;
      case '=':
        let rpn;
        if (temp) {
          rpn = evaluate(
            expression.slice(0, expression.length - temp.length - 2)
          );
          setCurrentOp(rpn);
          setOperation(rpn);
          setExpression(rpn);
        } else {
          rpn = evaluate(expression);
          setCurrentOp(rpn);
          setOperation(rpn);
          setExpression(rpn);
        }
        break;
      default:
        if (temp) {
          setCurrentOp(`${key}`);
          setTemp('');
          setOperation(`${operation}${key}`);
          setExpression(`${expression}${key}`);
        } else if (
          currentOp.length === 1 &&
          currentOp[0] === '0' &&
          operation[operation.length - 2] !== '.'
        ) {
          setCurrentOp(key);
          setOperation(`${operation.slice(0, operation.length - 1)}${key}`);
          setExpression(`${expression.slice(0, expression.length - 1)}${key}`);
        } else {
          setCurrentOp(currentOp + key);
          setOperation(`${operation}${key}`);
          setExpression(`${expression}${key}`);
        }
        break;
    }
  };

  return (
    <div id="calculator">
      <h1>
        <i className="fab fa-free-code-camp"></i> Calculator
      </h1>
      <Display operation={operation} currentOp={currentOp} />
      <Keyboard action={handleInput} />
    </div>
  );
};

export default Calculator;
