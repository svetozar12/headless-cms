import { CSSProperties, ReactNode, useEffect, useState } from "react";
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
  dataSource: Record<string, any>[];
  columns: IColumns[];
  extraProps?: IExtraProps;
}

const Table: React.FC<ITable> = (props) => {
  const { extraProps, columns, dataSource } = props;
  const { className, ...restProps } = extraProps || {};
  const [data, setData] = useState<typeof dataSource>([]);
  const currentPage = 1;
  const pageSize = 10;

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
    setData(dataSource.slice(currentPage - 1, pageSize));
  }, []);

  const onChange = (pageNumber: number) => {
    setData(
      dataSource.slice(
        (pageNumber - 1) * pageSize,
        (pageNumber - 1) * pageSize + pageSize
      )
    );
  };

  const renderContent = () => {
    return (
      <>
        {data.map((item) => {
          return (
            <div className="rounded-md hover:bg-table-headerBackground">
              <tr
                className={`flex py-2 duration-150 ease-in-out hover:border-transparent ${s.borderBottom} ${s.borderTop}`}
              >
                {columns.map(({ dataIndex, render }) => {
                  return (
                    <td className="flex flex-1 justify-center font-semibold text-gray-700">
                      {render ? render : dataIndex ? item[dataIndex] : ""}
                    </td>
                  );
                })}
              </tr>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <table className={`${className} my-2 w-full`} {...restProps}>
      <div className="w-full rounded-t-md bg-table-headerBackground">
        {renderHeading()}
      </div>
      {renderContent()}
      <Pagination
        total={dataSource.length}
        current={currentPage}
        onChange={onChange}
      />
    </table>
  );
};

export default Table;
