import React, { FC } from "react";
import { FaDropbox } from "react-icons/fa";
import Heading from "../../Heading";
import s from "./Content/Content.module.css";

type Props = {
  isLoading: boolean;
};

const BlankState: FC<Props> = ({ isLoading }) => {
  return (
    <div
      className={`flex h-72 w-full flex-col items-center justify-center ${s.borderBottom}`}
    >
      {!isLoading && (
        <>
          <Heading text="No data" type="h1" />
          <FaDropbox className="h-12 w-12 text-white" />
        </>
      )}
    </div>
  );
};

export default BlankState;
