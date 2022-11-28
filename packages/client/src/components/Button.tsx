import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { IconType } from "react-icons/lib";
interface IButtonProps {
  onClick: (e: any) => void;
  type: "button" | "submit" | "reset";
  text?: string;
  isDisabled?: boolean;
  Icon?: IconType;
  extraProps?: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

const Button = (props: IButtonProps) => {
  const { Icon, text, onClick, type, isDisabled, extraProps } = props;
  if (isDisabled) {
    return (
      <div className={"flex items-center justify-center"}>
        <button
          {...extraProps}
          disabled={true}
          type={type}
          className={`mx-2 my-4 w-full cursor-not-allowed rounded-md bg-mainPurple p-2 font-bold text-white opacity-30 duration-200 ease-in-out autofill:bg-transparent ${extraProps?.className}`}
        >
          {Icon && <Icon className={`${text && "mr-1"}`} />}
          {text}
        </button>
      </div>
    );
  }

  return (
    <div className={"flex items-center justify-center"}>
      <button
        {...extraProps}
        type={type}
        onClick={onClick}
        className={`mx-2 my-4 flex w-full items-center justify-center rounded-md bg-mainPurple p-2 font-bold !text-white duration-200 ease-in-out autofill:bg-transparent hover:opacity-90 active:opacity-80 ${extraProps?.className}`}
      >
        {Icon && <Icon className={`${text && "mr-1"}`} />}
        {text}
      </button>
    </div>
  );
};

export default Button;
