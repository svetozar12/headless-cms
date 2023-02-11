import React, { FC } from "react";
import s from "./PageHeader.module.css";

interface IPageHeader {
  children: JSX.Element | JSX.Element[];
  extraProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const PageHeader: FC<IPageHeader> = (props) => {
  const { children, extraProps } = props;
  const { className, ...rest } = extraProps || {};
  return (
    <div
      className={`flex h-20 w-full items-center bg-offBlack px-8 text-white ${s.borderBottom} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default PageHeader;
