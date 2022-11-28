import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useSession from "../../../hooks/useSession";
import api from "../../../utils/api";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import ModelModal from "./subcomponents/ModelModal";
import ModelTable from "./subcomponents/ModelTable";

const ContentModels: React.FC = () => {
  const { setTokens } = useSession();
  const router = useRouter();
  const cookie = useCookie();
  const [isModal, setIsModal] = useState(false);
  const { data, refetch, isLoading } = useQuery(
    ["contentModel", router.query.page],
    () =>
      api.ContentModel.get.all(
        cookie.get("accessToken") as string,
        router.query.page as any
      )
  );

  useEffect(() => {
    setTokens();
  }, [data]);

  const render = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <ModelModal isModal={isModal} setIsModal={setIsModal} />
        <ModelTable setIsModal={setIsModal} />
      </div>
    );
  };
  return <>{render()}</>;
};

export default ContentModels;
