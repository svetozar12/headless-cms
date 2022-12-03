import { useEffect, useState } from "react";
import ModelModal from "./subcomponents/ModelModal";
import ModelTable from "./subcomponents/ModelTable";

const ContentList: React.FC = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div className="flex h-screen flex-col items-center bg-mainBlack">
      <ModelModal isModal={isModal} setIsModal={setIsModal} />
      <ModelTable setIsModal={setIsModal} />
    </div>
  );
};

export default ContentList;
