const Display = ({ operation, currentOp, isNegative, operationString }) => {
  console.log(operationString);
  // const display = `${operation.join('')}${isNegative ? '-' : ''}`;
  const display = `1`;
  return (
    <div id="display">
      <p id="operation">{display}</p>
      <h3 id="currentOp">{currentOp}</h3>
    </div>
  );
};

export default Display;
