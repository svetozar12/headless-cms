import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import Spinner from "../Spinner";
import BlankState from "./subcomponents/BlankState";
import Content from "./subcomponents/Content";
import Heading from "./subcomponents/Heading";
import Pagination from "./subcomponents/Pagination";

interface IExtraProps {
  style?: CSSProperties;
  className?: string;
}

export interface IColumn {
  title: string;
  dataIndexes?: string[];
  formatValue?: (value: any) => any;
  render?: (fieldProps: any) => ReactNode;
}

interface ITable {
  dataSource: any;
  columns: IColumn[];
  isLoading?: boolean;
  customHeader?: ReactNode;
  onTableChange?: (page: number) => Promise<void>;
  onRowClickHandle?: (fieldProps: any) => void;
  extraProps?: IExtraProps;
}

const Table: React.FC<ITable> = ({
  extraProps,
  columns,
  isLoading = false,
  dataSource,
  onTableChange,
  onRowClickHandle,
  customHeader,
}) => {
  const { className, ...restProps } = extraProps || {};
  const { data, setData } = useData(dataSource, isLoading);
  if (isLoading) return <Spinner isLoading={isLoading} />;
  const { pagination } = dataSource || {};
  const { page = 1, total = 8 } = pagination || {};

  if (!data || data.length < 1)
    return (
      <div className="flex h-40 w-full items-center justify-center">
        <BlankState />
      </div>
    );

  const onChange = (pageNumber: number) => {
    onTableChange?.(pageNumber).then(() => {
      setData(dataSource);
    });
  };

  const onRowClick = (rowProp: any, _: React.ChangeEvent) => {
    onRowClickHandle?.(rowProp);
  };

  const renderTable = () => {
    return (
      <table
        className={`${className} relative w-full shadow-gray-700`}
        {...restProps}
      >
        <tbody className="w-full rounded-t-md bg-offBlack">
          {customHeader}
          <Heading columns={columns} />
        </tbody>
        <Content columns={columns} data={data} onRowClick={onRowClick} />
      </table>
    );
  };

  return (
    <div className="relative">
      <Spinner isLoading={!!isLoading} />
      {renderTable()}
      <Pagination total={total} current={page} onChange={onChange} />
    </div>
  );
};

export default Table;
const useData = (dataSource: any, loading: boolean) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (!loading) setData(dataSource);
    if (!dataSource && !loading) return setData([]);
  }, [dataSource, loading]);
  return { data, dataSource, setData };
};
