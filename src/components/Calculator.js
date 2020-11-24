import { useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [currentOp, setCurrentOp] = useState('0');
  const [operator, setOperator] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);

  const operation = expression.split(' ').join('');

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
      if (isNaN(expression)) {
        let result;
        let top = stack.pop();
        let bottom = stack.pop();
        switch (expression) {
          case '+':
            result = bottom + top;
            break;
          case '-':
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
    }

    return String(stack);
  };

  const handleInput = (key) => {
    // reset all variables
    const _resetCalculator = () => {
      setExpression('');
      setCurrentOp('0');
      setOperator('');
      setIsDecimal(false);
    };

    // handle '.'
    const _decimalLogic = () => {
      if (!isDecimal) {
        setCurrentOp(`${currentOp}${key}`);
        setExpression(`${expression}${key}`);
        setIsDecimal(true);
      }
    };

    // handle '-' operator
    const _negativeLogic = () => {
      if (operation[operation.length - 1] === '.') {
        return;
      }
      if (!operator) {
        setOperator(key);
        setCurrentOp(`${key}`);
        if (operation.length) {
          setExpression(`${expression} ${key} `);
        } else {
          setExpression(`${expression}${key}`);
        }
      } else if (operator && operator !== key && operator.length < 2) {
        setCurrentOp(`${key}`);
        setExpression(`${expression}${key}`);
        setOperator(operator + key);
      }
      setIsDecimal(false);
    };

    // handle '+,/,*' operators
    const _operatorLogic = () => {
      if (operation[operation.length - 1] === '.') {
        return;
      }
      if (!operator && operation.length) {
        setCurrentOp(`${key}`);
        setExpression(`${expression} ${key} `);
        setOperator(key);
      } else if (operator && operator[0] !== key && operation.length > 1) {
        setCurrentOp(`${key}`);
        setExpression(
          `${expression.slice(
            0,
            expression.length - operator.length - 2
          )} ${key} `
        );
        setOperator(key);
      }
      setIsDecimal(false);
    };

    // handle every other input
    const _operandLogic = () => {
      if (currentOp.length === 22) {
        return;
      }
      if (operator) {
        setCurrentOp(`${key}`);
        setOperator('');
        setExpression(`${expression}${key}`);
      } else if (
        currentOp.length === 1 &&
        currentOp[0] === '0' &&
        operation[operation.length - 2] !== '.'
      ) {
        setCurrentOp(key);
        setExpression(`${expression.slice(0, expression.length - 1)}${key}`);
      } else {
        setCurrentOp(currentOp + key);
        setExpression(`${expression}${key}`);
      }
    };

    const _evaluateExpression = () => {
      let rpn;
      if (operator) {
        rpn = String(
          evaluate(expression.slice(0, expression.length - operator.length - 2))
        );
        setCurrentOp(rpn);
        setExpression(rpn);
      } else {
        rpn = String(evaluate(expression));
        setCurrentOp(rpn);
        setExpression(rpn);
      }
      setOperator('');
    };

    switch (key) {
      case 'C':
        _resetCalculator();
        break;
      case '.':
        _decimalLogic();
        break;
      case '+':
      case '/':
      case '*':
        _operatorLogic();
        break;
      case '-':
        _negativeLogic();
        break;
      case '=':
        _evaluateExpression();
        break;
      default:
        _operandLogic();
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
