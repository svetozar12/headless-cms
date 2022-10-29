import React from "react";

interface IFormWrapper {
  children: React.ReactNode;
  error: string;
}

const FormWrapper = (props: IFormWrapper) => {
  const { children, error } = props;
  return (
    <div className="flex h-screen w-full items-center justify-center bg-mainBlack ">
      <form className="flex h-3/5 w-5/6 flex-col justify-center gap-3 rounded-md bg-offBlack py-5 px-16 md:w-2/4 xl:w-1/4">
        {error && <h1 className="text-center text-xl text-red-500">{error}</h1>}
        {children}
      </form>
    </div>
  );
};

export default FormWrapper;
