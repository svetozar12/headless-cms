import { useQuery } from "@tanstack/react-query";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import api from "../utils/api";

const useGetContentModels = () => {
  const cookie = useCookie();
  const router = useRouter();
  const query = useQuery(["contentModels", router.query.page], () =>
    api.ContentModel.getAll(
      cookie.get("accessToken") as string,
      (router.query.page as any) || 1
    )
  );

  return { ...query };
};

export default useGetContentModels;
