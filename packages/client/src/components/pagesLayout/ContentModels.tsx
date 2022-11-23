import { useQuery } from "@tanstack/react-query";
import { parseCookies } from "nookies";
import { FaAccusoft, FaPlus } from "react-icons/fa";
import { MdDelete, MdUpdate } from "react-icons/md";
import useSession from "../../hooks/useSession";
import api from "../../utils/api";
import ActionButtons from "../ActionButtons";
import Button from "../Button";
import Table from "../Table";

const ContentModels: React.FC = () => {
  useSession();
  const cookie = parseCookies();
  const { data, isLoading } = useQuery(["contentModel"], () =>
    api.ContentModel.get.all(cookie.accessToken as string)
  );
  if (isLoading) return <>...loading</>;

  const columns = [
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

  const render = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="w-2/4">
          <Table
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
