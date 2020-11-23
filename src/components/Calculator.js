import { useState } from 'react';
import Display from './Display';
import Keyboard from './Keyboard';

const Calculator = () => {
  const [rpn, setRPN] = useState('');
  const [operationString, setOperationString] = useState('');
  // const [operation, setOperation] = useState([]);
  const [operation, setOperation] = useState('');
  const [expression, setExpression] = useState('');
  const [currentOp, setCurrentOp] = useState('');
  const [temp, setTemp] = useState('');
  const [isDecimal, setIsDecimal] = useState(false);
  const [isNegative, setIsNegative] = useState(false);

  const toRPN = () => {};

  // const handleInput = (key) => {
  //   const operatorLogic = () => {
  //     if (!temp) {
  //       console.log('currentOP', currentOp);
  //       setOperation([...operation, currentOp]);
  //       setCurrentOp(`${key}`);
  //       setOperationString(`${operationString}${key}`);
  //       // setOperation([...operation, ...key]);
  //     } else if (temp && temp !== key) {
  //       setIsNegative(false);
  //       setCurrentOp(`${key}`);
  //       // setOperation(
  //       //   // `${operation.slice(0, operation.length - temp.length)}${key}`
  //       //   [...operation.slice(0, operation.length - temp.length), ...key]
  //       // );
  //       setOperationString(
  //         `${operation.slice(0, operation.length - temp.length)}${key}`
  //       );
  //     }
  //     setIsDecimal(false);
  //     setTemp(key);
  //   };

  //   switch (key) {
  //     case 'C':
  //       setExpression('');
  //       setOperation([]);
  //       setOperationString('');
  //       setCurrentOp('');
  //       setTemp('');
  //       setIsDecimal(false);
  //       setIsNegative(false);
  //       break;
  //     case '.':
  //       if (!isDecimal) {
  //         setCurrentOp(`${currentOp}${key}`);
  //         setOperationString(`${operationString}${key}`);
  //         setIsDecimal(true);
  //       }
  //       break;
  //     case '+':
  //     case '/':
  //     case '*':
  //       operatorLogic();
  //       break;
  //     case '-':
  //       if (!temp) {
  //         setCurrentOp(`${key}`);
  //         setOperation([...operation, currentOp]);
  //         setOperationString(`${operationString}${key}`);
  //       } else if (temp && temp !== key) {
  //         setIsNegative(true);
  //         // setCurrentOp(`${key}`);
  //       }
  //       setIsDecimal(false);
  //       break;
  //     case '=':
  //       setOperation([...operation, currentOp]);
  //       break;
  //     default:
  //       if (isNegative) {
  //         key = '-' + key;
  //         setIsNegative(false);
  //       }
  //       if (temp) {
  //         console.log('temp', temp);
  //         setOperation([...operation, temp]);
  //         setExpression(`${expression} ${temp} `);
  //         setCurrentOp(`${key}`);
  //         setTemp('');
  //       } else {
  //         setExpression(`${expression}${key}`);
  //         setCurrentOp(currentOp + key);
  //       }
  //       setOperationString(`${operationString}${key}`);
  //       break;
  //   }
  // };

  const handleInput = (key) => {
    const operatorLogic = () => {
      if (!temp && operation.length) {
        setCurrentOp(`${key}`);
        setOperation(`${operation}${key}`);
      } else if (temp && temp[0] !== key) {
        setCurrentOp(`${key}`);
        setOperation(
          `${operation.slice(0, operation.length - temp.length)}${key}`
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
          setOperation(`${operation}${key}`);
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
          setTemp(key);
          setCurrentOp(`${key}`);
          setOperation(`${operation}${key}`);
        } else if (temp && temp !== key && temp.length < 2) {
          setCurrentOp(`${key}`);
          setOperation(`${operation}${key}`);
          setTemp(temp + key);
        }
        setIsDecimal(false);
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
        setOperation(`${operation}${key}`);
        break;
    }
  };

  console.log('expression', expression);
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
