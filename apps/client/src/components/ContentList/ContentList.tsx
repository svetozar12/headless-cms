import { useState } from "react";
import ContentHeader from "./subcomponents/ContentHeader";
import ContentTable from "./subcomponents/ContentTable";

const ContentList: React.FC = () => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = (value: boolean) => {
    setIsModal(value);
  };
  return (
    <div className="flex min-h-screen h-full flex-col items-center bg-mainBlack">
      <ContentHeader toggleModal={toggleModal} />
      <ContentTable />
    </div>
  );
};

export default ContentList;
