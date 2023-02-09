import React, { FC } from "react";
import { queryClient } from "../../../../../pages/_app";
import { api } from "../../../../../utils/api";
import { SetState } from "../../../../../utils/common";
import ActionButtons from "../../../../ActionButtons";
import Button from "../../../../Button";
import Heading from "../../../../Heading";
import Modal from "../../../../Modal";

interface IConfirmDeleteModal {
  isDeleteModal: boolean;
  setIsDeleteModal: SetState<boolean>;
  modelId: number;
  modelTitle: string;
}

const ConfirmDeleteModal: FC<IConfirmDeleteModal> = (props) => {
  const { modelId, modelTitle, isDeleteModal, setIsDeleteModal } = props;
  const { mutateAsync, isLoading } = api.contentModel.deleteById.useMutation({
    onSuccess: () => {
      const queryKey = api.contentModel.getQueryKey();
      queryClient.invalidateQueries(queryKey);
    },
  });
  return (
    <Modal
      isLoading={isLoading}
      isOpen={isDeleteModal}
      onOverlayClick={() => setIsDeleteModal(false)}
      footer={
        <ActionButtons
          buttons={[
            {
              Render: (
                <Button
                  text="Cancel"
                  onClick={() => setIsDeleteModal(false)}
                  type="button"
                />
              ),
            },
            {
              Render: (
                <Button
                  text="Delete"
                  onClick={async () => {
                    await mutateAsync(modelId);
                    setIsDeleteModal(false);
                  }}
                  type="button"
                  extraProps={{ className: "bg-red-700" }}
                />
              ),
            },
          ]}
        />
      }
    >
      <Heading
        text={`Do you want to delete model ${modelTitle}`}
        type="h1"
        className="mt-2"
      />
    </Modal>
  );
};

export default ConfirmDeleteModal;
