import { useState } from "react";
import ModelHeader from "./subcomponents/ModelHeader";
import ModelModal from "./subcomponents/ModelModal";
import ModelTable from "./subcomponents/ModelTable/ModelTable";

const ContentModelList: React.FC = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex h-screen flex-col items-center bg-mainBlack">
      <ModelHeader setIsModal={setIsModal} />
      <ModelModal isModal={isModal} setIsModal={setIsModal} />
      <ModelTable />
    </div>
  );
};

export default ContentModelList;
