import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdEdit, MdUpdate } from "react-icons/md";
import { CONTENT_MODEL, CONTENT_MODELS } from "../../../constants/routes";
import useDeleteContentModel from "../../../hooks/useDeleteContentModel";
import useGetContentModels from "../../../hooks/useGetContentModels";
import ActionButtons from "../../ActionButtons";
import Button from "../../Button";
import Table from "../../Table";

interface IModelTable {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const ModelTable: FC<IModelTable> = (props) => {
  const { setIsModal } = props;
  const router = useRouter();
  const { mutate } = useDeleteContentModel();
  const { data, isLoading } = useGetContentModels();
  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Number", dataIndex: "number" },
    { title: "Text", dataIndex: "text" },
    { title: "Json", dataIndex: "json" },
    {
      title: "Action",
      render: (
        <ActionButtons
          buttons={[
            {
              Render: (
                <Button
                  Icon={MdDelete}
                  onClick={() => console.log("delete")}
                  type="button"
                />
              ),
            },
            {
              Render: (
                <Button
                  Icon={MdEdit}
                  onClick={() => console.log("update")}
                  type="button"
                />
              ),
            },
          ]}
        />
      ),
    },
  ];

  const renderActionButtons = () => {
    return (
      <div className="mt-2 flex justify-end border-2 border-black border-opacity-5 bg-offBlack">
        <Button onClick={() => setIsModal(true)} type="button" Icon={FaPlus} />
      </div>
    );
  };

  const onTableChange = async (page: number) => {
    router.push(`${CONTENT_MODELS}/?page=${page}`, undefined, {
      shallow: true,
    });
  };

  return (
    <div className="relative w-2/4">
      <Table
        onRowClick={(field: any) => router.push(CONTENT_MODEL(field.id))}
        isLoading={isLoading}
        onTableChange={onTableChange}
        customHeader={renderActionButtons()}
        columns={columns}
        dataSourceIndex="contentModel"
        dataSource={data}
        extraProps={{ className: "mt-10 rounded-t-xl" }}
      />
    </div>
  );
};

export default ModelTable;
