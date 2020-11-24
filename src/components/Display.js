const Display = ({ operation, currentOp }) => {
  return (
    <div id="displayScreen">
      <p id="operation">{operation}</p>
      <h3 id="display">{currentOp}</h3>
    </div>
  );
};

export default Display;
