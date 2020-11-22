import Button from './Button';

const keys = [
  { display: 'C', special: 'clearBtn' },
  { display: '/' },
  { display: '*' },
  { display: '7' },
  { display: '8' },
  { display: '9' },
  { display: '-' },
  { display: '4' },
  { display: '5' },
  { display: '6' },
  { display: '+' },
  { display: '1' },
  { display: '2' },
  { display: '3' },
  { display: '0', special: 'zeroBtn' },
  { display: '.' },
  { display: '=', special: 'equalBtn' },
];

const Keyboard = () => {
  return (
    <div id="keyboard">
      {keys.map((key) => (
        <Button key={key} {...key} />
      ))}
    </div>
  );
};

export default Keyboard;
