import React, { FC } from "react";
import { IColumn } from "../Table";

const Heading: FC<{ columns: IColumn[] }> = (props) => {
  const { columns } = props;
  return (
    <tr className={`bg-off flex py-2 text-gray-400`}>
      {columns.map(({ title }) => (
        <th key={title} className="flex-1 text-center font-semibold">
          {title}
        </th>
      ))}
    </tr>
  );
};

export default Heading;
