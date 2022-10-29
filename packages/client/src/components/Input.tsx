interface IInputProps {
  name: string;
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "color"
    | "range"
    | "file"
    | "checkbox"
    | "radio"
    | "submit"
    | "image"
    | "reset"
    | "button";
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}

const Input = (props: IInputProps) => {
  const { name, type, placeholder, value, onChange } = props;
  return (
    <>
      <label htmlFor={name} className="px-2 text-white">
        {name}
      </label>
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
        />
      </div>
    </>
  );
};

export default Input;
