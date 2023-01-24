import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { sdk } from "../utils/rest-api-sdk";
export const useGetContentModel = () => {
  const router = useRouter();
  const { id } = router.query;
  const query = useQuery(["contentModel", id], () =>
    sdk.contentModel.v1ContentModelIdGet({ id: parseInt(id as string) }),
  );

  return query;
};
