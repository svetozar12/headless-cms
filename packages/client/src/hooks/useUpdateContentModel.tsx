import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { queryClient } from "../pages/_app";
import api from "../utils/api";
import useSession from "./useSession";
import type { ContentModel } from "@headless-cms/server";

const useUpdateContentModel = () => {
  const router = useRouter();
  const { setTokens } = useSession();
  setTokens();
  const mutation = useMutation({
    mutationFn: (model: { modelId: number; newModel: any }) =>
      api.contentModel.update(model.modelId, model.newModel),
    onSuccess: () =>
      queryClient.invalidateQueries(["contentModels", router.query.page]),
  });
  return mutation;
};

export default useUpdateContentModel;
