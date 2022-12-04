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
        return (
          <tr
            key={index}
            onClick={(e: any) => onRowClick?.(item, e)}
            className={`flex bg-offBlack py-2 duration-150 ease-in-out hover:border-transparent hover:bg-opacity-20 ${
              !!onRowClick && "cursor-pointer"
            } ${s.borderBottom} ${s.borderTop}`}
          >
            {columns.map(({ dataIndex, render }) => {
              return (
                <td
                  key={dataIndex}
                  className="flex flex-1 justify-center font-semibold text-gray-400"
                >
                  {render ? (
                    <div>{render(item)}</div>
                  ) : dataIndex ? (
                    String(item[dataIndex])
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
