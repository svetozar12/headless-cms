import React, { FC } from "react";
import { IColumn } from "../../Table";
import s from "./Content.module.css";
import { getValue } from "./utils";

interface IContent {
  columns: IColumn[];
  data: any[];
  onRowClick: (rowProp: any, _: React.ChangeEvent) => void;
}

const Content: FC<IContent> = (props) => {
  const { columns, data, onRowClick } = props;
  return (
    <tbody>
      {data.map((item, index) => {
        let value: any;
        return (
          <tr
            key={index}
            onClick={(e: any) => onRowClick?.(item, e)}
            className={`flex bg-offBlack py-2 duration-150 ease-in-out hover:border-transparent hover:bg-opacity-20 ${
              !!onRowClick && "cursor-pointer"
            } ${s.borderBottom} ${s.borderTop}`}
          >
            {columns.map(({ dataIndexes, render, formatValue }) => {
              if (dataIndexes) {
                if (formatValue)
                  value = formatValue(getValue(dataIndexes, item));
                else value = String(getValue(dataIndexes, item));
                console.log(value);
              }
              return (
                <td
                  key={dataIndexes?.[0]}
                  className="flex flex-1 items-center justify-center font-semibold text-gray-400"
                >
                  {render ? (
                    <div>{render(item)}</div>
                  ) : dataIndexes?.[0] ? (
                    value
                  ) : null}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Content;
