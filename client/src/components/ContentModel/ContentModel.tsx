import { useRouter } from "next/router";
import { api } from "../../utils/api";
import ActionButtons from "../ActionButtons";
import Button from "../Button";
import Spinner from "../Spinner";
import Field from "./subcomponents/Field";
import Heading from "./subcomponents/Heading";
import { useState } from "react";
import FieldModal from "./subcomponents/FieldModal";

const ContentModel = () => {
  const router = useRouter();
  const { query } = router;
  const [isModal, setIsModal] = useState(false);

  const {
    data,
    isLoading: isFieldTypeLoading,
  } = api.fieldType.getAll.useQuery();
  const {
    data: modelData,
    isLoading: isModelLoading,
  } = api.contentModel.getById.useQuery(parseInt(query.id as string));
  const toggleModal = (value: boolean) => {
    setIsModal(value);
  };
  const isLoading = isFieldTypeLoading || isModelLoading;
  const { name } = modelData || {};

  return (
    <div className="h-screen bg-offBlack">
      <Spinner isLoading={isLoading} />
      <FieldModal isModal={isModal} toggleModal={toggleModal} />
      <div className="flex w-full flex-col items-center justify-center">
        <Heading
          title={name || ""}
          ActionButtons={
            <ActionButtons
              buttons={[
                {
                  Render: (
                    <Button
                      onClick={() => toggleModal(true)}
                      type="button"
                      text="Add Field"
                    />
                  ),
                },
              ]}
            />
          }
        />
        <div className="w-2/5">
          {data?.map(({ name, fieldType }) => {
            return (
              <Field
                key={name}
                type={fieldType || ""}
                title={name || ""}
                // setUpdatedFields={setUpdatedFields}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentModel;
