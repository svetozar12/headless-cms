import { ContentModel } from "@headless-cms/server";
import { useQuery } from "@tanstack/react-query";
import { useCookie } from "next-cookie";
import { useRouter } from "next/router";
import React from "react";
import api from "../../utils/api";
import Heading from "../Heading";
import Field from "./subcomponents/Field";
import s from "./ContentModel.module.css";
import Button from "../Button";
import useDeleteContentModel from "../../hooks/useDeleteContentModel";
import { FaTrash } from "react-icons/fa";
import { CONTENT_MODELS } from "../../constants/routes";

const ContentModel = () => {
  const { data, isLoading, error } = useGetContentModel();
  const router = useRouter();
  const { mutateAsync } = useDeleteContentModel();
  if (isLoading) return <div>...loading</div>;
  const { id, userId, title, ...fields } = data || {};
  return (
    <div className="h-screen bg-offBlack">
      <div
        className={`mb-20 flex w-full justify-between bg-black py-6 ${s.borderBottom}`}
      >
        <Heading text={title || ""} className="ml-2 w-full" type="h1" />
        <Button
          type="button"
          onClick={() => {
            mutateAsync(id as number).then(() => router.push(CONTENT_MODELS));
          }}
          Icon={FaTrash}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <Heading type="h1" text="Fields" className="mb-5" />
        <div className="w-2/5">
          {Object.keys(fields).map((fieldType) => {
            return <Field title={title as string} type={fieldType} />;
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
