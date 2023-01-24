import { useState } from "react";
import ModelHeader from "./subcomponents/ModelHeader";
import ModelModal from "./subcomponents/ModelModal";
import ModelTable from "./subcomponents/ModelTable/ModelTable";

const ContentModelList: React.FC = () => {
  const [isModal, setIsModal] = useState(false);

  const toggleModal = (value: boolean) => {
    setIsModal(value);
  };

  return (
    <div className="flex h-screen flex-col items-center bg-mainBlack">
      <ModelHeader toggleModal={toggleModal} />
      <ModelModal isModal={isModal} toggleModal={toggleModal} />
      <ModelTable />
    </div>
  );
};

export default ContentModelList;
