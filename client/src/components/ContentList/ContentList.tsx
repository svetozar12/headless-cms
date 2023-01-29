import { useState } from "react";
import ContentHeader from "./subcomponents/ModelHeader";

const ContentList: React.FC = () => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = (value: boolean) => {
    setIsModal(value);
  };
  return (
    <div className="flex h-screen flex-col items-center bg-mainBlack">
      <ContentHeader toggleModal={toggleModal} />
    </div>
  );
};

export default ContentList;
