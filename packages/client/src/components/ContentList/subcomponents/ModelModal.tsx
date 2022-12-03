import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import useCookies from "../../../hooks/useCookies";
import { queryClient } from "../../../pages/_app";
import api from "../../../utils/api";
import { IContentModel } from "../../../utils/api/resources/contentModel";
import ActionButtons from "../../ActionButtons";
import Button from "../../Button";
import Form from "../../Form";
import { IFields } from "../../Form/Form";
import Heading from "../../Heading";
import Modal from "../../Modal";

interface IModelModal {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const ModelModal: FC<IModelModal> = (props) => {
  const { isModal, setIsModal } = props;
  const { mutateAsync, isLoading } = useCreateModel();
  const { modelTitle, json, number, text } = useValues();

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
          extraProps: { ref: json },
        },
        label: "json",
        name: "json",
        type: "checkbox",
      },
      {
        extraProps: {
          extraProps: { ref: text },
        },
        label: "text",
        name: "text",
        type: "checkbox",
      },
      {
        extraProps: {
          extraProps: { ref: number },
        },
        label: "number",
        name: "number",
        type: "checkbox",
      },
    ];
  };

  const handleSubmit = async () => {
    const titleValue = modelTitle.current?.value;
    const jsonValue = json.current?.checked;
    const numberValue = number.current?.checked;
    const textValue = text.current?.checked;

    setIsModal(false);
    await mutateAsync({
      title: titleValue as string,
      json: !!jsonValue,
      number: !!numberValue,
      text: !!textValue,
    });
  };

  const render = () => {
    return (
      <Modal onOverlayClick={() => setIsModal(false)} isOpen={isModal}>
        <Form
          isLoading={isLoading}
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
                      onClick={() => setIsModal(false)}
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
  const json = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLInputElement>(null);
  const number = useRef<HTMLInputElement>(null);

  return { modelTitle, json, text, number };
};

const useCreateModel = () => {
  const { accessToken } = useCookies();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (newModel: IContentModel) =>
      api.ContentModel.createModel(accessToken, newModel),
    onSuccess: () => {
      queryClient.invalidateQueries(["contentModel", router.query.page]);
    },
  });
  return { ...mutation };
};
