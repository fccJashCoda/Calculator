import { useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

const Calculator = () => {
  const [rpn, setRPN] = useState('');
  // const [operation, setOperation] = useState('7777');
  const [operation, setOperation] = useState(['7777']);
  const [currentOp, setCurrentOp] = useState('7');
  const [temp, setTemp] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);
  const [isNegative, setIsNegative] = useState(false);

  const toRPN = () => {};

  const handleInput = (key) => {
    const operatorLogic = () => {
      if (!temp) {
        setCurrentOp(`${key}`);
        // setOperation(`${operation}${key}`);
        setOperation([...operation, ...key]);
      } else if (temp && temp !== key) {
        setCurrentOp(`${key}`);
        setOperation(
          // `${operation.slice(0, operation.length - temp.length)}${key}`
          [...operation.slice(0, operation.length - temp.length), ...key]
        );
      }
      setIsDecimal(false);
      setTemp(key);
    };

    switch (key) {
      case 'C':
        setOperation('');
        setCurrentOp('');
        setTemp('');
        setIsDecimal(false);
        break;
      case '.':
        if (!isDecimal) {
          setCurrentOp(`${currentOp}${key}`);
          setOperation([...operation, ...key]);
          setIsDecimal(true);
        }
        break;
      case '+':
        operatorLogic();
        break;
      case '/':
        operatorLogic();
        break;
      case '*':
        operatorLogic();
        break;
      case '-':
        if (!temp) {
          setCurrentOp(`${key}`);
          setOperation([...operation, ...key]);
        } else if (temp && temp !== key) {
          setCurrentOp(`${key}`);
        }
        setIsDecimal(false);
        if (temp.length < 2 && temp !== key) {
          setOperation([...operation, ...key]);
          setTemp(temp + key);
        }
        break;
      case '=':
        console.log(toRPN(operation));
        break;
      default:
        if (temp) {
          console.log(temp);
          setCurrentOp(`${key}`);
          setTemp('');
        } else {
          setCurrentOp(currentOp + key);
        }
        setOperation([...operation, ...key]);
        break;
    }
  };

  console.log(operation);

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
