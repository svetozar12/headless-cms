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

interface IDataSource {
  data: Record<string, any>[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

interface ITable {
  dataSource: IDataSource;
  columns: IColumns[];
  isLoading?: boolean;
  onTableChange?: () => Promise<void>;
  extraProps?: IExtraProps;
}

const Table: React.FC<ITable> = (props) => {
  const { extraProps, columns, isLoading, dataSource, onTableChange } = props;
  const { className, ...restProps } = extraProps || {};
  const { contentModel: resourceData, pagination } = dataSource;
  const { page, pageSize, total } = pagination;
  const [data, setData] = useState<typeof resourceData>([]);

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
    console.log(resourceData, dataSource);

    if (!onTableChange) setData(resourceData.slice(page - 1, pageSize));
    onTableChange?.()
      .then(() => {
        setData(resourceData.slice(page - 1, pageSize));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (pageNumber: number) => {
    setData(
      resourceData.slice(
        (pageNumber - 1) * pageSize,
        (pageNumber - 1) * pageSize + pageSize
      )
    );
  };

  const renderContent = () => {
    return (
      <div className="relative">
        <Spinner isLoading={!!isLoading} />
        {data.map((item) => {
          return (
            <div className="rounded-md hover:bg-table-headerBackground">
              <tr
                className={`flex py-2 duration-150 ease-in-out hover:border-transparent ${s.borderBottom} ${s.borderTop}`}
              >
                {columns.map(({ dataIndex, render }) => {
                  console.log(dataIndex, dataIndex && String(item[dataIndex]));

                  return (
                    <td className="flex flex-1 justify-center font-semibold text-gray-700">
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
    <table className={`${className} my-2 w-full`} {...restProps}>
      <div className="w-full rounded-t-md bg-table-headerBackground">
        {renderHeading()}
      </div>
      {renderContent()}
      <Pagination total={total} current={page} onChange={onChange} />
    </table>
  );
};

export default Table;
