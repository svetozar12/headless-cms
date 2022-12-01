import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import ActionButtons from "../../../ActionButtons";
import Button from "../../../Button";
import Form from "../../../Form";
import { IFields } from "../../../Form/Form";
import Heading from "../../../Heading";
import Modal from "../../../Modal";

interface IModelModal {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const ModelModal: FC<IModelModal> = (props) => {
  const { isModal, setIsModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { modelTitle, json, number, text } = useValues();
  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    console.log(
      "submit",
      modelTitle.current?.value,
      json.current?.checked,
      number.current?.checked,
      text.current?.checked
    );
  };

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
        name: "json",
        type: "checkbox",
      },
      {
        extraProps: {
          extraProps: { ref: text },
        },
        name: "text",
        type: "checkbox",
      },
      {
        extraProps: {
          extraProps: { ref: number },
        },
        name: "number",
        type: "checkbox",
      },
    ];
  };

  const render = () => {
    return (
      <Modal onOverlayClick={() => setIsModal(false)} isOpen={isModal}>
        <Form
          isLoading={isLoading}
          error=""
          handleSubmit={handleSubmit}
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
                      onClick={handleSubmit}
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
