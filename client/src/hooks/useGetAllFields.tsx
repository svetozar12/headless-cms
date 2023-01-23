import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { sdk } from "../utils/rest-api-sdk";
// TODO: FIX
export const useGetAllFieldTypes = () => {
  const router = useRouter();
  const { id } = router.query;
  const query = useQuery(["contentModel", id], () =>
    sdk.fieldType.v1FieldTypeGet(),
  );

  return query;
};
