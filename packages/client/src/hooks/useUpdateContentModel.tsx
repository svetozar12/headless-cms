import { useMutation } from "@tanstack/react-query";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { queryClient } from "../pages/_app";
import api from "../utils/api";
import { IContentModel } from "../utils/api/resources/contentModel";
import { GenericObject } from "../utils/common";

const useUpdateContentModel = () => {
  const cookie = useCookie();
  const router = useRouter();
  const accessToken: string = cookie.get("accessToken");
  const mutation = useMutation({
    mutationFn: (model: { modelId: number; newModel: GenericObject }) =>
      api.ContentModel.update(accessToken, model.modelId, model.newModel),
    onSuccess: () =>
      queryClient.invalidateQueries(["contentModels", router.query.page]),
  });
  return mutation;
};

export default useUpdateContentModel;
