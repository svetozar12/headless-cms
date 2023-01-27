import { FormControl, Input, InputLabel } from "@mui/material";
import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";
import { CONTENT_MODEL } from "../../../constants/routes";
import { queryClient } from "../../../pages/_app";

import { api } from "../../../utils/api";

import ActionButtons from "../../ActionButtons";
import Button from "../../Button";
import Form, { IFields } from "../../Form/Form";
import Heading from "../../Heading";
import Modal from "../../Modal";

interface IFieldModal {
  isModal: boolean;
  toggleModal: (value: boolean) => void;
}

const FieldModal: FC<IFieldModal> = ({ isModal, toggleModal }) => {
  const router = useRouter();
  const { query } = router;
  const { mutate, isLoading } = api.fieldType.create.useMutation({
    onSuccess: () => {
      const queryKeyFieldType = api.fieldType.getQueryKey();
      const queryKeyModel = api.contentModel.getQueryKey();
      queryClient.invalidateQueries(queryKeyModel);
      queryClient.invalidateQueries(queryKeyFieldType);
      toggleModal(false);
    },
  });
  const { fieldName, fieldType } = useValues();

  const getFIelds = () => {
    return [
      {
        name: "fieldTitle",
        ref: fieldName,
      },
      {
        name: "fieldType",
        ref: fieldType,
      },
    ];
  };

  const handleSubmit = () => {
    const fieldTitle = fieldName.current?.value;
    const fieldTypeName = fieldType.current?.value;

    mutate({
      name: fieldTitle || "",
      fieldType: fieldTypeName || "",
      contentModelId: parseInt(query.id as string) || 0,
    });
  };

  const render = () => {
    return (
      <Modal
        onOverlayClick={() => toggleModal(false)}
        isOpen={isModal}
        isLoading={isLoading}
      >
        {getFIelds().map(({ name, ref }) => {
          return (
            <FormControl className="!bg-inputBlack w-full bg-transparent !my-2 !rounded-md">
              <InputLabel className="!text-white">{name}</InputLabel>
              <Input
                inputRef={ref}
                className="!px-2 bg-transparent !text-white autofill:bg-transparent active:border-0"
              />
            </FormControl>
          );
        })}
        <ActionButtons
          buttons={[
            {
              Render: (
                <Button
                  text="Create"
                  onClick={async () => await handleSubmit()}
                  type="button"
                />
              ),
            },
            {
              Render: (
                <Button
                  text="Cancel"
                  onClick={() => toggleModal(false)}
                  type="button"
                  extraProps={{
                    style: { border: "1px solid rgba(0,0,0,0.1)" },
                    className: "bg-white !text-black hover:!border-mainPurple",
                  }}
                />
              ),
            },
          ]}
        />
      </Modal>
    );
  };

  return <>{render()}</>;
};

export default FieldModal;

const useValues = () => {
  const fieldName = useRef<HTMLInputElement>(null);
  const fieldType = useRef<HTMLInputElement>(null);

  return { fieldName, fieldType };
};
