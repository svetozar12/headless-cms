interface IButtonProps {
  text: string;
  onClick: (e: any) => void;
  type: "button" | "submit" | "reset";
  isDisabled?: boolean;
}

const Button = (props: IButtonProps) => {
  const { text, onClick, type, isDisabled } = props;
  if (isDisabled) {
    return (
      <button
        disabled={isDisabled}
        type={type}
        className="mx-2 my-4 cursor-not-allowed rounded-md bg-gray-500 p-2 text-white"
      >
        {text}
      </button>
    );
  }

  return (
    <div className={"mt-1 flex items-center justify-center"}>
      <button
        type={type}
        onClick={onClick}
        className={
          "mx-2 my-4 w-full rounded-md bg-mainPurple p-2 font-bold !text-white duration-200 ease-in-out autofill:bg-transparent hover:opacity-90 active:opacity-80"
        }
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
