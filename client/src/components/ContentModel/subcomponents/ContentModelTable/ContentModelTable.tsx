import { ChangeEvent, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { ContentmodelContentModel } from "../../../../server/sdk";
import { api } from "../../../../utils/api";
import ActionButtons from "../../../ActionButtons";
import Button from "../../../Button";
import Table, { IColumn } from "../../../Table/Table";
import FieldModalEdit from "../FieldModalEdit";
import ConfirmDeleteModal from "./subcomponents/ConfirmDeleteModal";

const ContentModelTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [model, setModel] = useState<{ id: number | null; title: string }>({
    id: null,
    title: "",
  });
  const { data, isLoading } = api.fieldType.getAll.useQuery();
  const columns: IColumn[] = [
    { title: "Title", dataIndex: "name" },
    { title: "Field Type", dataIndex: "fieldType" },
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
                    setIsDelete(true);
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
                    const { id, name } = fieldProps;
                    setModel({ id, title: name });
                    setIsEdit(true);
                    // router.push(CONTENT_MODEL(fieldProps.id));
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
  return (
    <>
      <Table isLoading={isLoading} columns={columns} dataSource={data} />
      {isDelete && (
        <ConfirmDeleteModal
          isDeleteModal={isDelete}
          setIsDeleteModal={setIsDelete}
          fieldTypeId={model.id as number}
          fieldTypeTitle={model.title}
        />
      )}
      <FieldModalEdit
        isModal={isEdit}
        toggleModal={setIsEdit}
        oldFieldType={data?.find(({ id }) => id === model.id)}
      />
    </>
  );
};

export default ContentModelTable;
