import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { sdk } from "../utils/rest-api-sdk";

const useGetContentModels = () => {
  const router = useRouter();
  const query = useQuery(["contentModels", router.query.page], () =>
    sdk.contentModel.v1ContentModelGet(),
  );

  return { ...query };
};

export default useGetContentModels;
