import { User } from "@headless-cms/server";
import { MdDelete, MdUpdate } from "react-icons/md";
import useSession from "../../hooks/useSession";
import ActionButtons from "../ActionButtons";
import Table from "../Table";

const ContentModels: React.FC = () => {
  const { data, isLoading, error } = useSession();

  if (isLoading) return <>...loading</>;
  if (error) return <>{JSON.stringify(error)}</>;

  const { id, username } = data as User;
  let arr = [];
  for (let i = 0; i <= 20; i++) {
    if (i === 0) arr.push({ name: "first", age: 32, job: "web developer" });
    if (i === 10) arr.push({ name: "tenth", age: 32, job: "web developer" });
    if (i === 20) arr.push({ name: "twenty", age: 32, job: "web developer" });

    arr.push({ name: "hello", age: 32, job: "web developer" });
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-2/4">
        <Table
          columns={[
            { title: "Name", dataIndex: "name" },
            { title: "Age", dataIndex: "age" },
            { title: "Job", dataIndex: "job" },

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
          ]}
          dataSource={arr}
        />
      </div>
    </div>
  );
};

export default ContentModels;
