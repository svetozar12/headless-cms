import { useEffect, useState } from "react";
import ModelModal from "./subcomponents/ModelModal";
import ModelTable from "./subcomponents/ModelTable";

const ContentModels: React.FC = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center bg-mainBlack">
      <ModelModal isModal={isModal} setIsModal={setIsModal} />
      <ModelTable setIsModal={setIsModal} />
    </div>
  );
};

export default ContentModels;
