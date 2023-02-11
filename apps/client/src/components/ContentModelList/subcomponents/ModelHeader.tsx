import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaBoxes } from "react-icons/fa";
import Button from "../../Button";
import Heading from "../../Heading";
import PageHeader from "../../PageHeader";

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
