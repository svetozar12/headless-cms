import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import api from "../utils/api";
import useSession from "./useSession";

const useGetContentModels = () => {
  const router = useRouter();
  const { setTokens } = useSession();
  setTokens();
  const query = useQuery(["contentModels", router.query.page], () =>
    api.contentModel.getAll((router.query.page as any) || 1)
  );

  return { ...query };
};

export default useGetContentModels;
