import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { CONTENT_MODEL, CONTENT_MODELS } from "../../../../constants/routes";
import { sdk } from "../../../../server/rest-api-sdk";
import { api } from "../../../../utils/api";
import ActionButtons from "../../../ActionButtons";
import Button from "../../../Button";
import Table, { IColumn } from "../../../Table/Table";
import ConfirmDeleteModal from "./subcomponents/ConfirmDeleteModal";

const ModelTable: FC = () => {
  const router = useRouter();
  const { mutate } = api.contentModel.deleteById.useMutation();
  const { data, isLoading, isFetching } = api.contentModel.getAll.useQuery();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [model, setModel] = useState<{ id: number | null; title: string }>({
    id: null,
    title: "",
  });
  console.log(data, "|pedofiliaaa");

  const columns: IColumn[] = [
    { title: "Title", dataIndex: "name" },
    {
      title: "Fields",
      dataIndex: "FieldTypes",
      formatValue: (value) => {
        return value.length;
      },
    },
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
                    const { id, title } = fieldProps;
                    setIsDeleteModal(true);
                    setModel({ id, title });
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
                  onClick={() => {
                    router.push(CONTENT_MODEL(fieldProps.id));
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
    <>
      <ConfirmDeleteModal
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        modelId={model.id as number}
        modelTitle={model.title}
      />
      <div className={`relative w-2/4 ${(isLoading || isFetching) && "h-60"}`}>
        <Table
          onRowClickHandle={(field: any) =>
            router.push(CONTENT_MODEL(field.id))
          }
          isLoading={isLoading || isFetching}
          onTableChange={onTableChange}
          columns={columns}
          dataSource={data}
          extraProps={{ className: "mt-10 rounded-t-xl" }}
        />
      </div>
    </>
  );
};

export default ModelTable;
