import { ButtonProps } from '../interfaces/button-interface';

const SubmitButton = (props: ButtonProps) => {
  const { className, children } = props;
  const newClassName = `w-1/12 p-1 bg-green-500 rounded ${className}`;
  return (
    <button {...props} className={newClassName}>
      {children}
    </button>
  );
};

export default SubmitButton;
