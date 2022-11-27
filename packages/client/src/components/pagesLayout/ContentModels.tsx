import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import useSession from "../../hooks/useSession";
import api from "../../utils/api";
import ActionButtons from "../ActionButtons";
import Button from "../Button";
import Table from "../Table";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { CONTENT_MODELS } from "../../constants/routes";
import { queryClient } from "../../pages/_app";
import Modal from "../Modal";

const ContentModels: React.FC = () => {
  const { setTokens } = useSession();
  const router = useRouter();
  const cookie = useCookie();
  const { data, refetch, isLoading } = useQuery(
    ["contentModel", router.query.page],
    () =>
      api.ContentModel.get.all(
        cookie.get("accessToken") as string,
        router.query.page as any
      )
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTokens();
    if (data) setLoading(false);
  }, [data]);

  if (!data) return <>...loading</>;

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
            { Icon: MdDelete, handler: () => console.log("delete") },
            { Icon: MdUpdate, handler: () => console.log("update") },
          ]}
        />
      ),
    },
  ];

  const renderActionButtons = () => {
    return (
      <div className="mt-5 flex justify-end rounded-t-xl border-2 border-black border-opacity-5 bg-table-headerBackground">
        <Button
          onClick={() => console.log("buttn")}
          type="button"
          Icon={FaPlus}
        />
      </div>
    );
  };

  const onTableChange = async (page: number) => {
    setLoading(true);
    router
      .push(`${CONTENT_MODELS}/?page=${page}`, undefined, { shallow: true })
      .then(() => {
        setLoading(false);
      });
  };

  const render = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <Modal isOpen={true}>
          <h1>modal</h1>
        </Modal>
        <div className="w-2/4">
          <Table
            isLoading={loading}
            onTableChange={onTableChange}
            customHeader={renderActionButtons()}
            columns={columns}
            dataSourceIndex="contentModel"
            dataSource={data}
          />
        </div>
      </div>
    );
  };
  return <>{render()}</>;
};

export default ContentModels;
