import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import api from "../utils/sdk";

export const useGetContentModel = () => {
  const router = useRouter();
  const { id } = router.query;
  const query = useQuery(["contentModel", id], () =>
    api.contentModel.getById(id as string),
  );

  return query;
};
