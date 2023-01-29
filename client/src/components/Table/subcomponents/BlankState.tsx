import React from "react";
import { FaDropbox } from "react-icons/fa";
import Heading from "../../Heading";
import s from "./Content/Content.module.css";

const BlankState = () => {
  return (
    <div
      className={`flex h-72 w-full flex-col items-center justify-center ${s.borderBottom}`}
    >
      <FaDropbox className="h-12 w-12 text-white" />
      <Heading text="No data" type="h1" />
    </div>
  );
};

export default BlankState;
