import dayjs from "dayjs";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  CONTENT,
  CONTENT_LIST,
  MODEL,
  MODEL_LIST,
} from "../../../../constants/routes";
import { api } from "../../../../utils/api";
import ActionButtons from "../../../ActionButtons";
import Button from "../../../Button";
import Table, { IColumn } from "../../../Table/Table";
import ConfirmDeleteModal from "./subcomponents/ConfirmDeleteModal";
import * as relativeTime from "dayjs/plugin/relativeTime";
import {
  ContentmodelContentModel,
  ModelsPaginationModelArrayContentContent,
} from "../../../../server/sdk";
import { useSession } from "next-auth/react";
dayjs.extend(relativeTime.default);

const ContentTable: FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { query } = router;
  const { data, isFetching } = api.content.getAll.useQuery({
    pagination: { limit: 8, offSet: parseInt(query.page as string) || 1 },
    userId: session && session!.user!.id,
  });
  console.log(data);

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [content, setContent] = useState<{ id: number | null; title: string }>({
    id: null,
    title: "",
  });

  const columns: IColumn[] = [
    { title: "Title", dataIndexes: ["name"] },
    { title: "Content Type", dataIndexes: ["contentModel", "name"] },
    {
      title: "Updated",
      dataIndexes: ["updatedAt"],
      formatValue: (value: string) => {
        return dayjs(value).fromNow();
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
                    setContent({ id, title: name });
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
    router.push(`${CONTENT_LIST}/?page=${page}`, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <ConfirmDeleteModal
        isDeleteModal={isDeleteModal}
        setIsDeleteModal={setIsDeleteModal}
        contentId={content.id as number}
        contentTitle={content.title}
      />
      <div className={`relative w-2/4 ${isFetching && "h-60"}`}>
        <Table
          onRowClickHandle={(field: ContentmodelContentModel) =>
            router.push(CONTENT(field.id))
          }
          isLoading={isFetching}
          onTableChange={onTableChange}
          columns={columns}
          dataSource={data as ModelsPaginationModelArrayContentContent}
          extraProps={{ className: "mt-10 rounded-t-xl" }}
        />
      </div>
    </>
  );
};

export default ContentTable;
