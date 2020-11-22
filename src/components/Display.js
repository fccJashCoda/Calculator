const Display = ({ operation, currentOp }) => {
  return (
    <div id="display">
      <p id="operation">{operation}</p>
      <h3 id="currentOp">{currentOp}</h3>
    </div>
  );
};

export default Display;
