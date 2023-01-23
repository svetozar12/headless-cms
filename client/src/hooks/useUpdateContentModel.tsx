import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { queryClient } from "../pages/_app";
import { sdk } from "../utils/rest-api-sdk";
import { ContentmodelBody } from "../utils/sdk";
const useUpdateContentModel = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (model: { modelId: number; newModel: ContentmodelBody }) =>
      sdk.contentModel.v1ContentModelIdPut({
        id: model.modelId,
        request: model.newModel,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries(["contentModels", router.query.page]),
  });
  return mutation;
};

export default useUpdateContentModel;
