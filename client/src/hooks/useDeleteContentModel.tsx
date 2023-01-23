import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { queryClient } from "../pages/_app";
import { sdk } from "../utils/rest-api-sdk";

const useDeleteContentModel = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (modelId: number) =>
      sdk.contentModel.v1ContentModelIdDelete(modelId),
    onSuccess: () =>
      queryClient.invalidateQueries(["contentModels", router.query.page]),
  });
  return mutation;
};

export default useDeleteContentModel;
