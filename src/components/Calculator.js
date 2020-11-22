import Display from './Display';
import Keyboard from './Keyboard';

const Calculator = () => {
  return (
    <div id="calculator">
      <h1>
        <i class="fab fa-free-code-camp"></i> Calculator
      </h1>
      <Display />
      <Keyboard />
    </div>
  );
};

export default Calculator;
