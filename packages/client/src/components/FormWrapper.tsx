interface IFormWrapper {
  children: React.ReactNode;
}

const FormWrapper = (props: IFormWrapper) => {
  const { children } = props;
  return (
    <div className="flex h-screen w-full items-center justify-center bg-mainBlack ">
      <form className="flex h-3/5 w-5/6 flex-col justify-center gap-3 rounded-md bg-offBlack py-5 px-10 md:w-3/4 xl:w-1/4">
        {children}
      </form>
    </div>
  );
};

export default FormWrapper;
