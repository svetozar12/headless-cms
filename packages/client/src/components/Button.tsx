interface IButtonProps {
  text: string;
  onClick: (e: any) => void;
  type: "button" | "submit" | "reset";
}

const Button = (props: IButtonProps) => {
  const { text, onClick, type } = props;
  return (
    <div className={"flex items-center justify-center"}>
      <button
        type={type}
        onClick={onClick}
        className={
          "!text-white m-2 w-full rounded-md bg-mainPurple p-2 font-bold autofill:bg-transparent"
        }
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
