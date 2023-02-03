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
  fieldTypeId: number;
  fieldTypeTitle: string;
}

const ConfirmDeleteModal: FC<IConfirmDeleteModal> = ({
  fieldTypeId,
  fieldTypeTitle,
  isDeleteModal,
  setIsDeleteModal,
}) => {
  const { mutateAsync, isLoading } = api.fieldType.deleteById.useMutation({
    onSuccess: () => {
      const queryKey = api.fieldType.getQueryKey();
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
                    await mutateAsync(fieldTypeId);
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
        text={`Do you want to delete field type ${fieldTypeTitle}`}
        type="h1"
        className="mt-2"
      />
    </Modal>
  );
};

export default ConfirmDeleteModal;
