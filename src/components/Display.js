const Display = ({ operation, currentOp }) => {
  const display = operation.join('');
  return (
    <div id="display">
      <p id="operation">{display}</p>
      <h3 id="currentOp">{currentOp}</h3>
    </div>
  );
};

export default Display;
