import React, { FC, useState } from "react";
import s from "./Field.module.css";
import { getFieldIcon } from "./utils";

interface IFields {
  type: string;
  title: string;
  // setUpdatedFields: SetState<GenericObject>;
}

const Field: FC<IFields> = (props) => {
  const { title = "", type = "" } = props;
  const [field, setField] = useState<string>(title);
  const Icon = getFieldIcon(type);

  // useEffect(() => {
  //   setUpdatedFields((prev) => ({ ...prev, [type]: field }));
  // }, [field]);

  return (
    <div
      className={`my-5 flex items-center justify-between gap-4 rounded-md p-2 text-lg text-white ${s.border}`}
    >
      <div className="flex items-center justify-center gap-4 text-lg">
        <Icon className="text-green-400" />

        <p className="">{title}</p>
        <p className="">{type}</p>
      </div>
      {/* delete button */}
    </div>
  );
};

export default Field;
