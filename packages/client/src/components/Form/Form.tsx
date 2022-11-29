import React, { FC } from "react";
import { ZodSchema } from "zod";
import Button from "../Button";
import { IInputProps } from "../Input";
import Spinner from "../Spinner";
import Fields from "./subcomponents/Fields";

export interface IFields {
  type: string;
  label: string;
  name: string;
  handler: (e?: any) => void;
  value: any;
  rules?: ZodSchema;
  extraProps?: Partial<IInputProps>;
}

interface IForm {
  isLoading: boolean;
  error: string;
  handleSubmit: (e: any) => Promise<any>;
  fields: IFields[];
  formHeader?: React.ReactNode;
  customFormButtons?: React.ReactNode;
}

<input type="text" />;

const Form: FC<IForm> = (props) => {
  const {
    isLoading,
    error,
    handleSubmit,
    fields,
    formHeader,
    customFormButtons,
  } = props;

  return (
    <form className="relative flex w-full flex-col justify-center gap-3 rounded-md py-5 px-16 ">
      {error && <h1 className="text-center text-xl text-red-500">{error}</h1>}
      <Spinner isLoading={isLoading} />
      {formHeader}
      <Fields fields={fields} />
      {customFormButtons ? (
        customFormButtons
      ) : (
        <Button type="submit" text="Login" onClick={handleSubmit} />
      )}
    </form>
  );
};

export default Form;
