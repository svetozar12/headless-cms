interface IInputProps {
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
  onChange: (e: any) => void;
}

const Input = (props: IInputProps) => {
  const { type, placeholder, onChange } = props;
  return (
    <div className="m-2  rounded-md bg-inputBlack p-1">
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={
          "w-full bg-transparent p-2 text-white autofill:bg-transparent active:border-0"
        }
      />
    </div>
  );
};

export default Input;
