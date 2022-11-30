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
  const [modelTitle, setModelTitle] = useState("");
  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    await console.log("submit", modelTitle);
  };

  const getFIelds = (): IFields[] => {
    return [
      {
        value: modelTitle,
        handler: (e: React.ChangeEvent<HTMLInputElement>) =>
          setModelTitle(e.target.value),
        label: "model title",
        name: "modelTitle",
        type: "input",
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
                      onClick={() => console.log("create")}
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
