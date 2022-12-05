import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { GenericObject, SetState } from "../../../../utils/common";
import Switch from "../../../Input/subcomponents/Switch";
import s from "./Field.module.css";
import { getFieldIcon } from "./utils";

interface IFields {
  type: string;
  value: boolean;
  setUpdatedFields: SetState<GenericObject>;
}

const Field: FC<IFields> = (props) => {
  const { value = false, type = "", setUpdatedFields } = props;
  const [field, setField] = useState<boolean>(value);
  const Icon = getFieldIcon(type);

  useEffect(() => {
    setUpdatedFields((prev) => ({ ...prev, [type]: field }));
  }, [field]);

  return (
    <div
      className={`my-5 flex items-center justify-between gap-4 rounded-md p-2 text-lg text-white ${s.border}`}
    >
      <div className="flex items-center justify-center gap-4 text-lg">
        <Icon className="text-green-400" />
        <p className="">{type}</p>
      </div>
      <Switch
        checked={value}
        extraProps={{
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            setField(e.target.checked),
        }}
      />
    </div>
  );
};

export default Field;
