const keys = [
  { display: 'C', id: 'clear' },
  { display: '/', id: 'divide' },
  { display: '*', id: 'multiply' },
  { display: '7', id: 'seven' },
  { display: '8', id: 'eight' },
  { display: '9', id: 'nine' },
  { display: '-', id: 'subtract' },
  { display: '4', id: 'four' },
  { display: '5', id: 'five' },
  { display: '6', id: 'six' },
  { display: '+', id: 'add' },
  { display: '1', id: 'one' },
  { display: '2', id: 'two' },
  { display: '3', id: 'three' },
  { display: '0', id: 'zero' },
  { display: '.', id: 'decimal' },
  { display: '=', id: 'equals' },
];

const Keyboard = ({ action }) => {
  return (
    <div id="keyboard">
      {keys.map(({ display, id }, index) => (
        <div
          key={index}
          id={id}
          className={'button'}
          onClick={() => action(display)}
          // onClick={() => action(display)}
        >
          {display}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
