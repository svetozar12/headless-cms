import { useRouter } from "next/router";
import { api } from "../../utils/api";
import ActionButtons from "../ActionButtons";
import Button from "../Button";
import Heading from "./subcomponents/Heading";
import { useState } from "react";
import FieldModal from "./subcomponents/FieldModal";
import ContentModelTable from "./subcomponents/ContentModelTable/ContentModelTable";

const ContentModel = () => {
  const router = useRouter();
  const { query } = router;
  const [isModal, setIsModal] = useState(false);

  const { data: modelData, isFetching } = api.contentModel.getById.useQuery(
    parseInt(query.id as string),
  );
  const toggleModal = (value: boolean) => {
    setIsModal(value);
  };
  const { name } = modelData || {};

  return (
    <div className="h-screen bg-offBlack">
      <FieldModal isModal={isModal} toggleModal={toggleModal} />

      <div className="flex w-full flex-col items-center justify-center">
        <Heading
          isLoading={isFetching}
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
        <div className="w-2/4 relative">
          <ContentModelTable />
        </div>
      </div>
    </div>
  );
};

export default ContentModel;
