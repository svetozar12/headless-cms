import Switch from "./subcomponents/Switch";

export interface IInputProps {
  name: string;
  type: string;
  onChange: (e: any) => void;
  value?: any;
  label?: string;
  placeholder?: string;
  extraProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const Input = (props: IInputProps) => {
  const { name, label, type, placeholder, value, onChange, extraProps } = props;
  if (type === "checkbox") return <Switch ref={extraProps?.ref} />;
  return (
    <>
      {label && (
        <label htmlFor={name} className="px-2 text-white">
          {label}
        </label>
      )}
      <div className="m-2  rounded-md bg-inputBlack p-1">
        <input
          value={value}
          autoComplete={value}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          className={
            "w-full bg-transparent p-2 text-white autofill:bg-transparent active:border-0"
          }
          {...extraProps}
        />
      </div>
    </>
  );
};

export default Input;
