import { useQuery } from "@tanstack/react-query";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import api from "../utils/api";
import { ContentModel } from "@headless-cms/server";

export const useGetContentModel = () => {
  const router = useRouter();
  const { id } = router.query;
  const cookie = useCookie();
  const accessToken: string = cookie.get("accessToken");
  const query = useQuery<ContentModel>(["contentModel", id], () =>
    api.ContentModel.getById(accessToken, id as string)
  );
  return query;
};
