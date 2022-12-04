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
    isLoading = true,
    dataSource,
    dataSourceIndex,
    onTableChange,
    onRowClick: onRowclick,
    customHeader,
  } = props;

  const { className, ...restProps } = extraProps || {};
  const { data, setData } = useData(dataSource, dataSourceIndex, isLoading);
  if (isLoading) return <Spinner isLoading={isLoading} />;
  const { pagination } = dataSource;
  const { page, total } = pagination;

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

  const onRowClick = (rowProp: any, _: React.ChangeEvent) => {
    onRowclick?.(rowProp);
  };

  const renderContent = () => {
    return (
      <tbody>
        {data.map((item, index) => {
          return (
            <tr
              key={index}
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
                      <div>{render(item)}</div>
                    ) : dataIndex ? (
                      String(item[dataIndex])
                    ) : (
                      ""
                    )}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className="relative">
      <Spinner isLoading={!!isLoading} />
      <table
        className={`${className} relative w-full shadow-gray-700`}
        {...restProps}
      >
        <tbody className="w-full rounded-t-md bg-offBlack">
          {customHeader}
          {renderHeading()}
        </tbody>
        {renderContent()}
      </table>
      <Pagination total={total} current={page} onChange={onChange} />
    </div>
  );
};

export default Table;
const useData = (
  dataSource: any,
  dataSourceIndex: string,
  loading: boolean
) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!loading) setData(dataSource[dataSourceIndex]);
  }, [dataSource]);
  return { data, setData };
};
