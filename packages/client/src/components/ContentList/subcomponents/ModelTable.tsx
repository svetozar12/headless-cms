import { useRouter } from "next/router";
import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import { CONTENT_MODEL, CONTENT_MODELS } from "../../../constants/routes";
import useDeleteContentModel from "../../../hooks/useDeleteContentModel";
import useGetContentModels from "../../../hooks/useGetContentModels";
import ActionButtons from "../../ActionButtons";
import Button from "../../Button";
import Table from "../../Table";
import { IColumn } from "../../Table/Table";

const ModelTable: FC = () => {
  const router = useRouter();
  const { mutate } = useDeleteContentModel();
  const { data, isLoading, isFetching } = useGetContentModels();
  const columns: IColumn[] = [
    { title: "Title", dataIndex: "title" },
    { title: "Number", dataIndex: "number" },
    { title: "Text", dataIndex: "text" },
    { title: "Json", dataIndex: "json" },
    {
      title: "Action",
      render: (fieldProps: any) => (
        <ActionButtons
          buttons={[
            {
              Render: (
                <Button
                  Icon={MdDelete}
                  onClick={(e: ChangeEvent) => {
                    e.stopPropagation();
                    mutate(fieldProps.id);
                  }}
                  type="button"
                  extraProps={{ className: "relative z-20" }}
                />
              ),
            },
            {
              Render: (
                <Button
                  Icon={MdEdit}
                  onClick={(e: ChangeEvent) => {
                    e.stopPropagation();
                  }}
                  type="button"
                  extraProps={{ className: "relative z-20" }}
                />
              ),
            },
          ]}
        />
      ),
    },
  ];

  const onTableChange = async (page: number) => {
    router.push(`${CONTENT_MODELS}/?page=${page}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className={`relative w-2/4 ${(isLoading || isFetching) && "h-60"}`}>
      <Table
        onRowClickHandle={(field: any) => router.push(CONTENT_MODEL(field.id))}
        isLoading={isLoading || isFetching}
        onTableChange={onTableChange}
        columns={columns}
        dataSourceIndex="contentModel"
        dataSource={data}
        extraProps={{ className: "mt-10 rounded-t-xl" }}
      />
    </div>
  );
};

export default ModelTable;
