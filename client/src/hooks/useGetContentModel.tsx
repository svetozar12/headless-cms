import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { sdk } from "../utils/rest-api-sdk";
// TODO: FIX
export const useGetContentModel = () => {
  const router = useRouter();
  const { id } = router.query;
  const query = useQuery(["contentModel", id], () =>
    sdk.contentModel.v1ContentModelIdGet(parseInt(id as string)),
  );

  return query;
};
