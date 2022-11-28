import React, { Dispatch, FC, SetStateAction } from "react";
import ActionButtons from "../../../ActionButtons";
import Button from "../../../Button";
import Modal from "../../../Modal";

interface IModelModal {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const ModelModal: FC<IModelModal> = (props) => {
  const { isModal, setIsModal } = props;
  const render = () => {
    return (
      <Modal
        footer={
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
        onOverlayClick={() => setIsModal(false)}
        isOpen={isModal}
      >
        <h1>modal</h1>
      </Modal>
    );
  };

  return <>{render()}</>;
};

export default ModelModal;
