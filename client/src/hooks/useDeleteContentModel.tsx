import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { queryClient } from "../pages/_app";
import api from "../utils/sdk";

const useDeleteContentModel = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (modelId: number) => api.contentModel.delete(modelId),
    onSuccess: () =>
      queryClient.invalidateQueries(["contentModels", router.query.page]),
  });
  return mutation;
};

export default useDeleteContentModel;
