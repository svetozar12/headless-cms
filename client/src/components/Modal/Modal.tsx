import React from "react";
import s from "./Modal.module.css";

interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  footer?: React.ReactNode;
  onOverlayClick?: () => void;
}

const Modal: React.FC<IModal> = (props) => {
  const { children, footer, isOpen, onOverlayClick } = props;

  const renderFooter = () => {
    if (!footer) return null;
    return (
      <div
        style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}
        className="flex justify-end pt-2"
      >
        {footer}
      </div>
    );
  };

  if (!isOpen) return null;

  const renderOverlay = () => {
    return (
      <div
        onClick={onOverlayClick}
        style={{
          width: "100vw",
          height: "190vh",
          overflow: "hidden",
        }}
        className="absolute bg-gray-700 bg-opacity-50"
      />
    );
  };

  const renderContent = () => {
    return (
      <div
        className={`min-h-3/6 absolute z-50 flex w-3/5 flex-col justify-between rounded-md bg-offBlack p-2 ${s.modal}`}
      >
        <div>{children}</div>
        <div>{renderFooter()}</div>
      </div>
    );
  };
  return (
    <div className="absolute z-50 flex h-full w-full items-center justify-center">
      {renderOverlay()}
      {renderContent()}
    </div>
  );
};

export default Modal;
