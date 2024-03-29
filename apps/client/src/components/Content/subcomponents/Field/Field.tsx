import { Input, Switch } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import React, { FC } from "react";
import TextField from "@mui/material/TextField";
export type FieldType = "string" | "boolean" | "number" | "date" | "object";

type Props = {
  fieldTitle: string;
  fieldType: FieldType;
};

const Field: FC<Props> = ({ fieldType, fieldTitle }) => {
  const [value, setValue] = React.useState("2014-08-18T21:11:54");
  const handleChange = (newValue: any) => {
    setValue(newValue);
  };
  const render = () => {
    let field: React.ReactNode;
    const commonClassnames =
      "w-full bg-transparent !text-white autofill:bg-transparent active:border-0";
    switch (fieldType) {
      case "string":
        field = <Input className={`${commonClassnames}`} type="text" />;
        break;
      case "number":
        field = <Input className={commonClassnames} type="number" />;
        break;
      case "boolean":
        field = (
          <div className={commonClassnames}>
            <Switch />
          </div>
        );
        break;
      case "date":
        field = (
          <MobileDatePicker
            className={commonClassnames}
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        );
        break;
      case "object":
        field = <textarea className={commonClassnames}>object</textarea>;
        break;
      default:
        break;
    }
    return (
      <div className="w-2/4 border-l-2 border-cms_gray-100 focus:!border-cms_blue-100">
        <div className="ml-4">
          <p className="text-white mb-2">{fieldTitle}</p>
          {field}
        </div>
      </div>
    );
  };
  return (
    <div className="w-full flex justify-center items-center my-4">
      {render()}
    </div>
  );
};

export default Field;
