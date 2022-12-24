import Button from "packages/client/src/components/Button";
import Heading from "packages/client/src/components/Heading";
import PageHeader from "packages/client/src/components/PageHeader";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaBoxes } from "react-icons/fa";

interface IModelHeader {
  toggleModal: (value: boolean) => void;
}

const ModelHeader: FC<IModelHeader> = ({ toggleModal }) => {
  return (
    <PageHeader extraProps={{ className: "justify-between" }}>
      <div className="flex">
        <FaBoxes className="mr-4 h-8 w-8" />
        <Heading type="h1" text="Content Model" />
      </div>
      <Button
        onClick={() => toggleModal(true)}
        type="button"
        text="Add Content Type"
      />
    </PageHeader>
  );
};

export default ModelHeader;
