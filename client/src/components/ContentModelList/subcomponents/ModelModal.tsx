import {
  FormControl,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { useSession } from "next-auth/react";
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

interface IModelModal {
  isModal: boolean;
  toggleModal: (value: boolean) => void;
}

const ModelModal: FC<IModelModal> = (props) => {
  const { isModal, toggleModal } = props;
  const { data } = useSession();
  const { user } = data || {};
  const router = useRouter();
  const { mutate, isLoading } = api.contentModel.create.useMutation({
    onSuccess: (data) => {
      router.push(CONTENT_MODEL(data.id));
      const queryKey = api.contentModel.getQueryKey();
      queryClient.invalidateQueries(queryKey);
    },
  });
  const { modelTitle, description } = useValues();

  const getFIelds = () => {
    return [
      {
        name: "modelTitle",
        ref: modelTitle,
      },
      {
        name: "modelDescription",
        ref: description,
      },
    ];
  };

  const handleSubmit = () => {
    const titleValue = modelTitle.current?.value;
    const descriptionValue = description.current?.value;
    console.log(titleValue, modelTitle.current);

    mutate({
      request: {
        userId: user?.id || "",
        name: titleValue || "",
        description: descriptionValue || "",
      },
    });
  };

  const render = () => {
    return (
      <Modal
        onOverlayClick={() => toggleModal(false)}
        isOpen={isModal}
        isLoading={isLoading}
      >
        <Heading type="h1" text="Add model" className="text-white" />
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

export default ModelModal;

const useValues = () => {
  const modelTitle = useRef<Input>(null);
  const description = useRef<Input>(null);

  return { modelTitle, description };
};
