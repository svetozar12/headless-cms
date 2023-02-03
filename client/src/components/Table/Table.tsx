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

type Data = {
  data: any[];
  pagination: {
    limit: number;
    offSet: number;
    total: number;
  };
};

interface ITable {
  dataSource: Data;
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
  const { pagination = { limit: 10, offSet: 1, total: 10 } } = dataSource || {};
  const { offSet, total, limit } = pagination;

  if (!data || data.length < 1)
    return (
      <div className="flex h-40 w-full items-center relative justify-center">
        <Spinner isLoading={!!isLoading} />
        <BlankState isLoading={isLoading} />
      </div>
    );

  const onChange = (pageNumber: number) => {
    onTableChange?.(pageNumber).then(() => {
      setData(dataSource.data);
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
        <Spinner isLoading={!!isLoading} />
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
      {renderTable()}
      <Pagination total={total} current={offSet} onChange={onChange} />
    </div>
  );
};

export default Table;
const useData = (dataSource: Data, loading: boolean) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (!loading) setData(dataSource.data);
    if (!dataSource && !loading) return setData([]);
  }, [dataSource, loading]);
  return { data, dataSource, setData };
};
