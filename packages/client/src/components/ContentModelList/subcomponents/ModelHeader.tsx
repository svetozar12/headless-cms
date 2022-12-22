import React, { Dispatch, FC, SetStateAction } from "react";
import { FaBoxes } from "react-icons/fa";
import { Button, Heading, PageHeader } from "@headless-cms/ui";

interface IModelHeader {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const ModelHeader: FC<IModelHeader> = (props) => {
  const { setIsModal } = props;
  return (
    <PageHeader extraProps={{ className: "justify-between" }}>
      <div className="flex">
        <FaBoxes className="mr-4 h-8 w-8" />
        <Heading type="h1" text="Content Model" />
      </div>
      <Button
        onClick={() => setIsModal(true)}
        type="button"
        text="Add Content Type"
      />
    </PageHeader>
  );
};

export default ModelHeader;
