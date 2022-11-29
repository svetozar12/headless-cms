import React, { FC, useState } from "react";
import Input from "../../Input";
import { IFields } from "../Form";

const Fields: FC<{ fields: IFields[] }> = (props) => {
  const { fields } = props;
  const [error, setError] = useState("");

  const renderError = () => {
    if (!error) return <></>;
    // return <p className="text-white">{error}</p>;
  };

  return (
    <>
      {fields.map(
        ({ label, name, type, value, handler, rules, extraProps }) => {
          const isParse = rules?.safeParse(value);
          if (!isParse?.success) {
            const formatError = isParse?.error.issues[0]?.message;
            if (error !== formatError) setError(formatError as string);
          }
          return (
            <>
              <Input
                key={name}
                label={label}
                type={type}
                name={name}
                onChange={handler}
                extraProps={{ id: name, ...extraProps }}
              />
              {renderError()}
            </>
          );
        }
      )}
    </>
  );
};

export default Fields;
