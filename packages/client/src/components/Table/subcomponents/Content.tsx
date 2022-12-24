import React, { FC } from "react";
import { IColumn } from "../Table";
import s from "./Content.module.css";

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
            {columns.map(({ dataIndex = 0, render, formatValue }) => {
              if (formatValue) value = formatValue(item[dataIndex]);
              else value = String(item[dataIndex]);
              return (
                <td
                  key={dataIndex}
                  className="flex flex-1 items-center justify-center font-semibold text-gray-400"
                >
                  {render ? (
                    <div>{render(item)}</div>
                  ) : dataIndex ? (
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
