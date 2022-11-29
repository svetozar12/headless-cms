import React, { Dispatch, FC, SetStateAction, useState } from "react";
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
  const handleSubmit = async () => {
    console.log("submit");
  };

  const getFIelds = (): IFields[] => {
    return [
      {
        handler: () => console.log("handle"),
        label: "sos",
        name: "sos",
        type: "input",
        value: "",
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
            <Heading type="h1" text="Add model" className="text-black" />
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
