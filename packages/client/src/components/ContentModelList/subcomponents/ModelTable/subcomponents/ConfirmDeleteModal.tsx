import ActionButtons from "packages/client/src/components/ActionButtons";
import Button from "packages/client/src/components/Button";
import Heading from "packages/client/src/components/Heading";
import Modal from "packages/client/src/components/Modal";
import React, { FC } from "react";
import useDeleteContentModel from "../../../../../hooks/useDeleteContentModel";
import { SetState } from "../../../../../utils/common";

interface IConfirmDeleteModal {
  isDeleteModal: boolean;
  setIsDeleteModal: SetState<boolean>;
  modelId: number;
  modelTitle: string;
}

const ConfirmDeleteModal: FC<IConfirmDeleteModal> = (props) => {
  const { modelId, modelTitle, isDeleteModal, setIsDeleteModal } = props;
  const { mutate } = useDeleteContentModel();
  return (
    <Modal
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
                  onClick={() => {
                    mutate(modelId);
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
