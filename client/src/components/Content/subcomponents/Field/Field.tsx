import { Input, Radio } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import React, { FC } from "react";
import TextField from "@mui/material/TextField";

type Props = {
  fieldType: "string" | "boolean" | "number" | "date" | "object";
};

const Field: FC<Props> = ({ fieldType }) => {
  const [value, setValue] = React.useState("2014-08-18T21:11:54");
  console.log(fieldType);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  const render = () => {
    switch (fieldType) {
      case "string":
        return <Input type="text" />;
      case "number":
        return <Input type="number" />;
      case "boolean":
        <>
          <Radio />
          <Radio />
        </>;
      case "date":
        return (
          <MobileDatePicker
            label="Date mobile"
            inputFormat="MM/DD/YYYY"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        );
      case "object":
        <textarea>object</textarea>;
      default:
        break;
    }
  };
  return <div>{render()}</div>;
};

export default Field;
