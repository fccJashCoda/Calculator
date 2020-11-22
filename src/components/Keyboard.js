import Button from './Button';

const keys = [
  'c',
  '/',
  '*',
  '7',
  '8',
  '9',
  '-',
  '4',
  '5',
  '6',
  '+',
  '1',
  '2',
  '3',
  '0',
  '.',
  '=',
];

const Keyboard = () => {
  return (
    <div id="keyboard">
      {keys.map((key) => (
        <Button key={key} display={key} />
      ))}
    </div>
  );
};

export default Keyboard;
