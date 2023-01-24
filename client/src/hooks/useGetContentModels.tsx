import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "../utils/api";

const useGetContentModels = () => {
  const router = useRouter();
  const query = useQuery(["contentModels", router.query.page], () =>
    api.content.getAll.useQuery(),
  );

  return { ...query };
};

export default useGetContentModels;
