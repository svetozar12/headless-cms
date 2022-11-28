import React, { ReactNode } from "react";
import { IconType } from "react-icons/lib";

interface IActionButton {
  Render: ReactNode;
}

interface IActionButtons {
  buttons: IActionButton[];
}

const ActionButtons: React.FC<IActionButtons> = (props) => {
  const { buttons } = props;
  return (
    <div className="flex items-center">
      {buttons.map(({ Render }, index) => {
        return <React.Fragment key={index}>{Render}</React.Fragment>;
      })}
    </div>
  );
};

export default ActionButtons;
