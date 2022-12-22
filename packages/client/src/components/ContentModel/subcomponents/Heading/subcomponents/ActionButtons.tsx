import { useRouter } from "next/router";
import React, { FC, useState } from "react";
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
  const { isUpdated = false, updatedFields = {} } = props;
  const router = useRouter();
  const { mutateAsync: deleteContentModel } = useDeleteContentModel();
  const { mutateAsync: updateContentModel } = useUpdateContentModel();
  const { query } = router;
  const { id } = query;

  return (
    <div className="flex">
      <Button
        isDisabled={!isUpdated}
        onClick={() =>
          updateContentModel({
            modelId: id as unknown as number,
            newModel: updatedFields,
          }).then(() => router.push({ pathname: CONTENT_MODELS, query }))
        }
        extraProps={{ className: "bg-green-400" }}
        type="button"
        text="Save content type"
      />
      <Button
        onClick={() =>
          deleteContentModel(id as unknown as number).then(() =>
            router.push({ pathname: CONTENT_MODELS, query })
          )
        }
        type="button"
        text="Delete Content type"
      />
    </div>
  );
};

export default ActionButtons;
