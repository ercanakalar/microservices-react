import { InputProps } from "../interfaces/input-interface";

const Input = (props: InputProps) => {
  return <input required {...props} />;
};

export default Input;
