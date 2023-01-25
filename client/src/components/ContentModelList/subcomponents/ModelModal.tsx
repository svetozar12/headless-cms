import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import { queryClient } from "../../../pages/_app";
import { sdk } from "../../../server/rest-api-sdk";
import { ContentmodelBody } from "../../../server/sdk";

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
  // const { mutateAsync, isLoading } = useCreateModel();
  const { modelTitle } = useValues();

  const getFIelds = (): IFields[] => {
    return [
      {
        extraProps: {
          extraProps: { ref: modelTitle, placeholder: "model title" },
        },
        name: "modelTitle",
        type: "input",
      },
    ];
  };

  const handleSubmit = async () => {
    const titleValue = modelTitle.current?.value;

    toggleModal(false);
    // await mutateAsync({
    //   title: titleValue as string,
    // });
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

  return { modelTitle };
};

const useCreateModel = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (newModel: ContentmodelBody) =>
      sdk.contentModel.v1ContentModelPost(newModel),
    onSuccess: () => {
      queryClient.invalidateQueries(["contentModels", router.query.page]);
    },
  });
  return { ...mutation };
};
