import { useRouter } from "next/router";
import React, { FC } from "react";
import { CONTENT_MODELS } from "../../../../../constants/routes";
import useDeleteContentModel from "../../../../../hooks/useDeleteContentModel";
import useUpdateContentModel from "../../../../../hooks/useUpdateContentModel";
import { GenericObject } from "../../../../../utils/common";
import Button from "../../../../Button";

interface IActionButtons {
  isUpdated: boolean;
  updatedFields: GenericObject;
}

const ActionButtons: FC<IActionButtons> = (props) => {
  const { isUpdated, updatedFields } = props;
  const router = useRouter();
  const { mutateAsync: deleteContentModel } = useDeleteContentModel();
  const { mutateAsync: updateContentModel } = useUpdateContentModel();
  const { id } = router.query;

  return (
    <div className="flex">
      <Button
        isDisabled={!isUpdated}
        onClick={() =>
          updateContentModel({
            modelId: id as unknown as number,
            newModel: updatedFields,
          }).then(() => router.push(CONTENT_MODELS))
        }
        extraProps={{ className: "bg-green-400" }}
        type="button"
        text="Save content type"
      />
      <Button
        onClick={() =>
          deleteContentModel(id as unknown as number).then(() =>
            router.push(CONTENT_MODELS)
          )
        }
        type="button"
        text="Delete Content type"
      />
    </div>
  );
};

export default ActionButtons;
