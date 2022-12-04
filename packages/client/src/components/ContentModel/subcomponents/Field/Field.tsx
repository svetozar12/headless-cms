import React, { FC, useRef } from "react";
import Switch from "../../../Input/subcomponents/Switch";
import s from "./Field.module.css";
import { getFieldIcon } from "./utils";

interface IFields {
  value: boolean;
  type: string;
}

const Field: FC<IFields> = (props) => {
  const { value = false, type = "" } = props;
  const field = useRef<HTMLInputElement>(null);
  const Icon = getFieldIcon(type);
  return (
    <div
      className={`my-5 flex items-center justify-between gap-4 rounded-md p-2 text-lg text-white ${s.border}`}
    >
      <div className="flex items-center justify-center gap-4 text-lg">
        <Icon className="text-green-400" />
        <p className="">{type}</p>
      </div>
      <Switch checked={value} ref={field} />
    </div>
  );
};

export default Field;
