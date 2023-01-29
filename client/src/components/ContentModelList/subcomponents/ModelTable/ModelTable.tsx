import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { MODEL, MODEL_LIST } from "../../../../constants/routes";
import { api } from "../../../../utils/api";
import ActionButtons from "../../../ActionButtons";
import Button from "../../../Button";
import Table, { IColumn } from "../../../Table/Table";
import ConfirmDeleteModal from "./subcomponents/ConfirmDeleteModal";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { ContentmodelContentModel } from "../../../../server/sdk";
dayjs.extend(relativeTime.default);

const ModelTable: FC = () => {
  const router = useRouter();
  const { data, isFetching } = api.contentModel.getAll.useQuery();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [model, setModel] = useState<{ id: number | null; title: string }>({
    id: null,
    title: "",
  });
  const columns: IColumn[] = [
    { title: "Title", dataIndexes: ["name"] },
    { title: "Description", dataIndexes: ["description"] },
    {
      title: "Updated",
      dataIndexes: ["updatedAt"],
      formatValue: (value: string) => {
        return dayjs(value).fromNow();
      },
    },
    {
      title: "Fields",
      dataIndexes: ["fieldTypes"],
      formatValue: (value) => {
        return value.length;
      },
    },
    {
      title: "Action",
      render: (fieldProps: ContentmodelContentModel) => (
        <ActionButtons
          buttons={[
            {
              Render: (
                <Button
                  Icon={MdDelete}
                  onClick={(e: ChangeEvent) => {
                    e.stopPropagation();
                    const { id, name } = fieldProps;
                    setIsDeleteModal(true);
                    setModel({ id, title: name });
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
                    router.push(MODEL(fieldProps.id));
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
    router.push(`${MODEL_LIST}/?page=${page}`, undefined, {
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
      <div className={`relative w-2/4 ${isFetching && "h-60"}`}>
        <Table
          onRowClickHandle={(field: ContentmodelContentModel) =>
            router.push(MODEL(field.id))
          }
          isLoading={isFetching}
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
