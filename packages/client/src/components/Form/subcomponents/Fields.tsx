import React, { FC, useState } from "react";
import Input from "../../Input";
import { IFields } from "../Form";

const Fields: FC<{ fields: IFields[] }> = (props) => {
  const { fields } = props;

  return (
    <>
      {fields.map(
        ({ label, name, type, value, handler, rules, extraProps }) => {
          const isParse = rules?.safeParse(value);
          console.log(value, "darwin");

          return (
            <Input
              key={name}
              value={value}
              label={label}
              type={type}
              name={name}
              onChange={handler}
              extraProps={{ id: name, ...extraProps }}
            />
          );
        }
      )}
    </>
  );
};

export default Fields;
