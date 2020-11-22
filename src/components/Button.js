const Button = ({ display, special }) => {
  return (
    <div id={special ? special : null} className={'button'}>
      {display}
    </div>
  );
};

export default Button;
