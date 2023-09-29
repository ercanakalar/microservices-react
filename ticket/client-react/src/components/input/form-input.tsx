import { InputProps } from '../interfaces/input-interface';

const FormInput = (props: InputProps) => {
  const { className } = props;
  const newClassName = `outline-none border-b-2 border-gray-300 pl-2 w-full ${className}`;
  return <input required {...props} className={newClassName} />;
};

export default FormInput;
