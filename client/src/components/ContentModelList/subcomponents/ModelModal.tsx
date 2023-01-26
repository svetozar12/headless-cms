import { useSession } from "next-auth/react";
import { FC, useRef } from "react";
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
  const { mutate } = api.contentModel.create.useMutation({
    async onMutate() {
      const queryKey = api.contentModel.getQueryKey();
      queryClient.invalidateQueries(queryKey);
    },
    onSuccess: () => {
      const queryKey = api.contentModel.getQueryKey();

      queryClient.invalidateQueries(queryKey);
    },
  });
  const { modelTitle, description } = useValues();

  const getFIelds = (): IFields[] => {
    return [
      {
        extraProps: {
          extraProps: { ref: modelTitle, placeholder: "model title" },
        },
        name: "modelTitle",
        type: "input",
      },
      {
        extraProps: {
          extraProps: { ref: description, placeholder: "model description" },
        },
        name: "modelDescription",
        type: "input",
      },
    ];
  };

  const handleSubmit = () => {
    const titleValue = modelTitle.current?.value;
    const descriptionValue = description.current?.value;
    toggleModal(false);
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
      <Modal onOverlayClick={() => toggleModal(false)} isOpen={isModal}>
        <Form
          isLoading={false}
          error=""
          handleSubmit={async () => await handleSubmit()}
          fields={getFIelds()}
          formHeader={
            <Heading type="h1" text="Add model" className="text-white" />
          }
          customFormButtons={
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
                        className:
                          "bg-white !text-black hover:!border-mainPurple",
                      }}
                    />
                  ),
                },
              ]}
            />
          }
        />
      </Modal>
    );
  };

  return <>{render()}</>;
};

export default ModelModal;

const useValues = () => {
  const modelTitle = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  return { modelTitle, description };
};
