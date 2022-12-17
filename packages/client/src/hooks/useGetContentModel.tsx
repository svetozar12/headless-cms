import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import api from "../utils/api";
import { ContentModel, ContentModelWithRelations } from "@headless-cms/server";
import useSession from "./useSession";

export const useGetContentModel = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setTokens } = useSession();
  setTokens();
  const query = useQuery(["contentModel", id], () =>
    api.contentModel.getById(id as string)
  );

  return query;
};
