import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import Spinner from "../Spinner";
import Pagination from "./subcomponents/Pagination";
import s from "./Table.module.css";

interface IExtraProps {
  style?: CSSProperties;
  className?: string;
}

export interface IColumns {
  title: string;
  dataIndex?: string;
  render?: (fieldProps: any) => ReactNode;
}

interface ITable {
  dataSource: any;
  dataSourceIndex: string;
  columns: IColumns[];
  isLoading?: boolean;
  customHeader?: ReactNode;
  onTableChange?: (page: number) => Promise<void>;
  onRowClick?: (fieldProps: any) => void;
  extraProps?: IExtraProps;
}

const Table: React.FC<ITable> = (props) => {
  const {
    extraProps,
    columns,
    isLoading,
    dataSource,
    dataSourceIndex,
    onTableChange,
    onRowClick: onRowclick,
    customHeader,
  } = props;
  console.log(isLoading);

  if (isLoading) return <Spinner isLoading={isLoading} />;
  const { className, ...restProps } = extraProps || {};
  const { pagination } = dataSource;
  const { page, total } = pagination;
  const { data, setData } = useData(dataSource, dataSourceIndex);

  const renderHeading = () => {
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

  const onChange = (pageNumber: number) => {
    onTableChange?.(pageNumber).then(() => {
      setData(dataSource[dataSourceIndex]);
    });
  };

  const onRowClick = (rowProp: any, e: React.ChangeEvent) => {
    onRowclick?.(rowProp);
  };

  const renderContent = () => {
    return (
      <div className="relative">
        <Spinner isLoading={!!isLoading} />
        {data.map((item, index) => {
          return (
            <div key={index} className="rounded-md ">
              <tr
                onClick={(e: any) => onRowClick(item, e)}
                className={`flex bg-offBlack py-2 duration-150 ease-in-out hover:border-transparent hover:bg-opacity-20 ${
                  props.onRowClick && "cursor-pointer"
                } ${s.borderBottom} ${s.borderTop}`}
              >
                {columns.map(({ dataIndex, render }) => {
                  return (
                    <td
                      key={dataIndex}
                      className="flex flex-1 justify-center font-semibold text-gray-400"
                    >
                      {render ? (
                        <div onClick={() => console.log("button")}>
                          {render(item)}
                        </div>
                      ) : dataIndex ? (
                        String(item[dataIndex])
                      ) : (
                        ""
                      )}
                    </td>
                  );
                })}
              </tr>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <table
      className={`${className} relative w-full shadow-gray-700`}
      {...restProps}
    >
      <div className="w-full rounded-t-md bg-offBlack">
        {customHeader}
        {renderHeading()}
      </div>
      {renderContent()}
      <Pagination total={total} current={page} onChange={onChange} />
    </table>
  );
};

export default Table;

const useData = (dataSource: any, dataSourceIndex: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataSource[dataSourceIndex]);
  }, [dataSource]);
  return { data, setData };
};
