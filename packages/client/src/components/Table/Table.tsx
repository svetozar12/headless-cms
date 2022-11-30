import { CSSProperties, ReactNode, useEffect, useState } from "react";
import Spinner from "../Spinner";
import Pagination from "./subcomponents/Pagination";
import s from "./Table.module.css";

interface IExtraProps {
  style?: CSSProperties;
  className?: string;
}

interface IColumns {
  title: string;
  dataIndex?: string;
  render?: ReactNode;
}

interface ITable {
  dataSource: any;
  dataSourceIndex: string;
  columns: IColumns[];
  isLoading?: boolean;
  customHeader?: ReactNode;
  onTableChange?: (page: number) => Promise<void>;
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
    customHeader,
  } = props;
  if (isLoading) return <Spinner isLoading={isLoading} />;
  const { className, ...restProps } = extraProps || {};
  const { pagination } = dataSource;
  const { page, total } = pagination;
  const { data, setData } = useData(dataSource, dataSourceIndex);

  const renderHeading = () => {
    return (
      <tr className={`flex py-2 text-gray-400`}>
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

  const renderContent = () => {
    return (
      <div className="relative">
        <Spinner isLoading={!!isLoading} />
        {data.map((item, index) => {
          return (
            <div key={index} className="rounded-md ">
              <tr
                className={`flex bg-offBlack py-2 duration-150 ease-in-out hover:border-transparent hover:bg-opacity-20 ${s.borderBottom} ${s.borderTop}`}
              >
                {columns.map(({ dataIndex, render }) => {
                  return (
                    <td
                      key={dataIndex}
                      className="flex flex-1 justify-center font-semibold text-gray-400"
                    >
                      {render
                        ? render
                        : dataIndex
                        ? String(item[dataIndex])
                        : ""}
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
    <table className={`${className} w-full`} {...restProps}>
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
