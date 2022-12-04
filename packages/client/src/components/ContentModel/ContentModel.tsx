import { ContentModel } from "@headless-cms/server";
import { useQuery } from "@tanstack/react-query";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import React from "react";
import api from "../../utils/api";
import Heading from "../Heading";
import Field from "./subcomponents/Field/Field";
import useDeleteContentModel from "../../hooks/useDeleteContentModel";
import ModelHeading from "./subcomponents/Headin";

const ContentModel = () => {
  const { data, isLoading } = useGetContentModel();
  const router = useRouter();
  if (isLoading) return <div>...loading</div>;
  const { id, userId, title, ...fields } = data || {};
  return (
    <div className="h-screen bg-offBlack">
      <ModelHeading title={title || ""} />
      <div className="flex w-full flex-col items-center justify-center">
        <Heading type="h1" text="Fields" className="mb-5" />
        <div className="w-2/5">
          {Object.keys(fields).map((fieldType) => {
            return (
              <Field
                key={fieldType}
                value={fields[fieldType] as any}
                type={fieldType}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentModel;

const useGetContentModel = () => {
  const router = useRouter();
  const { id } = router.query;
  const cookie = useCookie();
  const accessToken: string = cookie.get("accessToken");
  const query = useQuery<ContentModel>(["contentModel", id], () =>
    api.ContentModel.getById(accessToken, id as string)
  );
  return query;
};
