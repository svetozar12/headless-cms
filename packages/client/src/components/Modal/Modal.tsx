import React, { useState } from "react";

interface IModal {
  children: React.ReactNode;
  isOpen: boolean;
  footer?: React.ReactNode;
}

const Modal: React.FC<IModal> = (props) => {
  const { children, footer, isOpen } = props;

  const renderFooter = () => {
    if (!footer) return null;
    return <div>{footer}</div>;
  };

  if (!isOpen) return null;

  const renderOverlay = () => {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        className="absolute bg-gray-700 bg-opacity-50"
      />
    );
  };

  const renderContent = () => {
    return (
      <div
        style={{
          width: "",
          height: "50vh",
          transform: " translate(-50%, 50%)",
        }}
        className="absolute left-2/4 z-50 rounded-md bg-white"
      >
        {children}
        {renderFooter()}
      </div>
    );
  };
  return (
    <div
      className="absolute z-50"
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      {renderOverlay()}
      {renderContent()}
    </div>
  );
};

export default Modal;
