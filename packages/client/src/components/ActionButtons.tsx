import React from "react";
import { IconType } from "react-icons/lib";

interface IActionButton {
  Icon: IconType;
  handler: () => void;
}

interface IActionButtons {
  buttons: IActionButton[];
}

const ActionButtons: React.FC<IActionButtons> = (props) => {
  const { buttons } = props;
  return (
    <div className="flex items-center">
      {buttons.map(({ Icon, handler }) => {
        return (
          <button
            className="flex flex-1 justify-center"
            type="button"
            onClick={handler}
          >
            <Icon className="h-6 w-6 duration-200 ease-in hover:text-mainPurple" />
          </button>
        );
      })}
    </div>
  );
};

export default ActionButtons;
