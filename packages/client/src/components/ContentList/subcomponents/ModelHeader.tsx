import React, { Dispatch, FC, SetStateAction } from "react";
import { MdContentPaste } from "react-icons/md";
import Button from "../../Button";
import Heading from "../../Heading";
import PageHeader from "../../PageHeader/PageHeader";

interface IModelHeader {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const ModelHeader: FC<IModelHeader> = (props) => {
  const { setIsModal } = props;
  return (
    <PageHeader extraProps={{ className: "justify-between" }}>
      <div className="flex">
        <MdContentPaste className="mr-4 h-8 w-8" />
        <Heading type="h1" text="Content" />
      </div>
      <Button
        onClick={() => setIsModal(true)}
        type="button"
        text="Add Content"
      />
    </PageHeader>
  );
};

export default ModelHeader;
