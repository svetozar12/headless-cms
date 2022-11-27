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
  const { className, ...restProps } = extraProps || {};
  const { pagination } = dataSource as any;
  const { page, pageSize, total } = pagination;
  const [data, setData] = useState([]);

  const renderHeading = () => {
    return (
      <tr className={`flex py-2`}>
        {columns.map(({ title }) => (
          <th key={title} className="flex-1 text-center font-semibold">
            {title}
          </th>
        ))}
      </tr>
    );
  };

  useEffect(() => {
    console.log(dataSource);

    setData(dataSource[dataSourceIndex]);
  }, [dataSource]);

  const onChange = (pageNumber: number) => {
    onTableChange?.(pageNumber).then(() => {
      setData(dataSource[dataSourceIndex]);
    });
  };

  const renderContent = () => {
    console.log(data);

    return (
      <div className="relative">
        <Spinner isLoading={!!isLoading} />
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-md hover:bg-table-headerBackground"
            >
              <tr
                className={`flex py-2 duration-150 ease-in-out hover:border-transparent ${s.borderBottom} ${s.borderTop}`}
              >
                {columns.map(({ dataIndex, render }) => {
                  return (
                    <td
                      key={dataIndex}
                      className="flex flex-1 justify-center font-semibold text-gray-700"
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
      <div className="w-full rounded-t-md bg-table-headerBackground">
        {customHeader}
        {renderHeading()}
      </div>
      {renderContent()}
      <Pagination total={total} current={page} onChange={onChange} />
    </table>
  );
};

export default Table;
