import React, { useState } from "react";

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
      <div className="min-h-1/6 absolute z-50 flex w-1/4 flex-col justify-between rounded-md bg-white p-2">
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
