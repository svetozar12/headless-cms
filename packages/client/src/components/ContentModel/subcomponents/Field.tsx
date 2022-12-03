import React, { FC } from "react";
import { FaFantasyFlightGames } from "react-icons/fa";
import s from "./Field.module.css";

interface IFields {
  title: string;
  type: string;
}

const Field: FC<IFields> = (props) => {
  const { title = "", type = "" } = props;
  return (
    <div
      className={`my-5 flex items-center rounded-md bg-white text-lg ${s.border}`}
    >
      <FaFantasyFlightGames />
      <p className="font-bold">{title}</p>
      <p className="">{type}</p>
    </div>
  );
};

export default Field;
