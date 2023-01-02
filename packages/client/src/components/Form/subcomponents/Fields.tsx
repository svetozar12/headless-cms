import React, { FC, useState } from "react";
import Input from "../../Input/Input";
import { IFields } from "../Form";

const Fields: FC<{ fields: IFields[] }> = (props) => {
  const { fields } = props;

  return (
    <>
      {fields.map(
        ({ label, name, type, value, handler, rules, extraProps }) => {
          return (
            <Input
              key={name}
              value={value}
              label={label}
              type={type}
              name={name}
              onChange={(e: React.ChangeEvent) => handler?.(e)}
              extraProps={{
                id: name,
                ...extraProps,
                ...extraProps?.extraProps,
              }}
            />
          );
        }
      )}
    </>
  );
};

export default Fields;
