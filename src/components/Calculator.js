import { useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

const Calculator = () => {
  const [rpn, setRPN] = useState('');
  const [operationString, setOperationString] = useState('');
  const [operation, setOperation] = useState([]);
  const [currentOp, setCurrentOp] = useState('');
  const [temp, setTemp] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);
  const [isNegative, setIsNegative] = useState(false);

  const toRPN = () => {};

  const handleInput = (key) => {
    const operatorLogic = () => {
      if (!temp) {
        console.log('currentOP', currentOp);
        setOperation([...operation, currentOp]);
        setCurrentOp(`${key}`);
        setOperationString(`${operationString}${key}`);
        // setOperation([...operation, ...key]);
      } else if (temp && temp !== key) {
        setIsNegative(false);
        setCurrentOp(`${key}`);
        // setOperation(
        //   // `${operation.slice(0, operation.length - temp.length)}${key}`
        //   [...operation.slice(0, operation.length - temp.length), ...key]
        // );
        setOperationString(
          `${operation.slice(0, operation.length - temp.length)}${key}`
        );
      }
      setIsDecimal(false);
      setTemp(key);
    };

    switch (key) {
      case 'C':
        setOperation([]);
        setOperationString('');
        setCurrentOp('');
        setTemp('');
        setIsDecimal(false);
        setIsNegative(false);
        break;
      case '.':
        if (!isDecimal) {
          setCurrentOp(`${currentOp}${key}`);
          setOperationString(`${operationString}${key}`);
          setIsDecimal(true);
        }
        break;
      case '+':
      case '/':
      case '*':
        operatorLogic();
        break;
      case '-':
        if (!temp) {
          setCurrentOp(`${key}`);
          setOperation([...operation, currentOp]);
          setOperationString(`${operationString}${key}`);
        } else if (temp && temp !== key) {
          setIsNegative(true);
          // setCurrentOp(`${key}`);
        }
        setIsDecimal(false);
        break;
      case '=':
        setOperation([...operation, currentOp]);
        break;
      default:
        if (isNegative) {
          key = '-' + key;
          setIsNegative(false);
        }
        if (temp) {
          console.log('temp', temp);
          setOperation([...operation, temp]);
          setCurrentOp(`${key}`);
          setTemp('');
        } else {
          setCurrentOp(currentOp + key);
        }
        setOperationString(`${operationString}${key}`);
        break;
    }
  };

  console.log('operation', operation);
  // console.log(currentOp);
  return (
    <div id="calculator">
      <h1>
        <i className="fab fa-free-code-camp"></i> Calculator
      </h1>
      <Display
        operation={operation}
        currentOp={currentOp}
        isNegative={isNegative}
        operationString={operationString}
      />
      <Keyboard action={handleInput} />
    </div>
  );
};

export default Calculator;
