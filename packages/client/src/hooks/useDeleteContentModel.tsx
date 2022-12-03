import { useMutation } from "@tanstack/react-query";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import { queryClient } from "../pages/_app";
import api from "../utils/api";

const useDeleteContentModel = () => {
  const cookie = useCookie();
  const router = useRouter();
  const accessToken: string = cookie.get("accessToken");
  const mutation = useMutation({
    mutationFn: (modelId: number) =>
      api.ContentModel.delete(accessToken, modelId),
    onSuccess: () =>
      queryClient.invalidateQueries(["contentModels", router.query.page]),
  });
  return mutation;
};

export default useDeleteContentModel;
