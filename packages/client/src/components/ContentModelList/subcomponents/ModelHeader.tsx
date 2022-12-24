import Button from "packages/client/src/components/Button";
import Heading from "packages/client/src/components/Heading";
import PageHeader from "packages/client/src/components/PageHeader";
import React, { Dispatch, FC, SetStateAction } from "react";
import { FaBoxes } from "react-icons/fa";

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
