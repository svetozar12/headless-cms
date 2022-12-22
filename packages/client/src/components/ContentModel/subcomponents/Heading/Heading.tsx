import React, { FC } from "react";
import { FaBoxes } from "react-icons/fa";
import { Heading, PageHeader } from "@headless-cms/ui";

interface IModelHeading {
  title: string;
  ActionButtons: JSX.Element;
}

const ModelHeading: FC<IModelHeading> = (props) => {
  const { title, ActionButtons } = props;

  return (
    <PageHeader extraProps={{ className: "justify-between" }}>
      <div className="flex">
        <FaBoxes className="mr-4 h-8 w-8" />
        <Heading type="h1" text={title} />
      </div>
      {ActionButtons}
    </PageHeader>
  );
};

export default ModelHeading;
