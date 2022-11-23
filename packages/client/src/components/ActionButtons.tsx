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
      {buttons.map(({ Icon, handler }, index) => {
        return (
          <button
            key={index}
            className="mx-1 flex justify-center bg-gray-400 bg-opacity-20 p-2 duration-150 hover:bg-gray-900 hover:bg-opacity-20"
            type="button"
            onClick={handler}
          >
            <Icon className="h-6 w-6 duration-200 ease-in" />
          </button>
        );
      })}
    </div>
  );
};

export default ActionButtons;
