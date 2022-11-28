import { useQuery } from "@tanstack/react-query";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import { CONTENT_MODELS } from "../../../../constants/routes";
import api from "../../../../utils/api";
import ActionButtons from "../../../ActionButtons";
import Button from "../../../Button";
import Table from "../../../Table";

interface IModelTable {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const ModelTable: FC<IModelTable> = (props) => {
  const { setIsModal } = props;
  const router = useRouter();
  const cookie = useCookie();
  const { data, isLoading: loading } = useQuery(
    ["contentModel", router.query.page],
    () =>
      api.ContentModel.get.all(
        cookie.get("accessToken") as string,
        router.query.page as any
      )
  );
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
                  onClick={() => console.log("create")}
                  type="button"
                />
              ),
            },
            {
              Render: (
                <Button
                  Icon={MdUpdate}
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
      <div className="mt-5 flex justify-end rounded-t-xl border-2 border-black border-opacity-5 bg-table-headerBackground">
        <Button onClick={() => setIsModal(true)} type="button" Icon={FaPlus} />
      </div>
    );
  };

  const onTableChange = async (page: number) => {
    router.push(`${CONTENT_MODELS}/?page=${page}`, undefined, {
      shallow: true,
    });
  };

  const render = () => {
    return (
      <Table
        isLoading={loading}
        onTableChange={onTableChange}
        customHeader={renderActionButtons()}
        columns={columns}
        dataSourceIndex="contentModel"
        dataSource={data}
      />
    );
  };

  return <div className="w-2/4">{render()}</div>;
};

export default ModelTable;
