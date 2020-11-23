import { useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

const Calculator = () => {
  const [operation, setOperation] = useState('');
  const [expression, setExpression] = useState('');
  const [currentOp, setCurrentOp] = useState('');
  const [temp, setTemp] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);

  const evaluate = (exp) => {
    const expArray = exp.trim().split(' ');
    console.log(expArray);
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
        if (temp) {
          console.log(
            evaluate(expression.slice(0, expression.length - temp.length - 2))
          );
        } else {
          console.log(evaluate(expression));
        }
        break;
      default:
        if (temp) {
          setCurrentOp(`${key}`);
          setTemp('');
          setOperation(`${operation}${key}`);
          setExpression(`${expression}${key}`);
        } else if (currentOp.length === 1 && currentOp[0] === '0') {
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
  console.log(expression);
  console.log('current', currentOp);
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
