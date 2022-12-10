import React, { useEffect, useState } from "react";
import { useGetContentModel } from "../../hooks/useGetContentModel";
import { GenericObject } from "../../utils/common";
import Heading from "../Heading";
import Spinner from "../Spinner";
import Field from "./subcomponents/Field";
import ModelHeading from "./subcomponents/Heading";
import ActionButtons from "./subcomponents/Heading/subcomponents/ActionButtons";

const ContentModel = () => {
  const { data, isLoading } = useGetContentModel();
  const { id, userId, title, ...fields } = data || {};
  const { isUpdated, updatedFields, setUpdatedFields } =
    useIsFieldsUpdated(fields);
  if (isLoading) return <Spinner isLoading={isLoading} />;

  return (
    <div className="h-screen bg-offBlack">
      <ModelHeading
        title={title || ""}
        ActionButtons={
          <ActionButtons isUpdated={isUpdated} updatedFields={updatedFields} />
        }
      />
      <div className="flex w-full flex-col items-center justify-center">
        <Heading type="h1" text="Fields" className="mb-5" />
        <div className="w-2/5">
          {Object.keys(fields).map((fieldType) => {
            return (
              <Field
                key={fieldType}
                value={fields[fieldType] as any}
                type={fieldType}
                setUpdatedFields={setUpdatedFields}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentModel;

const useIsFieldsUpdated = (fields: GenericObject) => {
  const [updatedFields, setUpdatedFields] = useState<Record<string, any>>({});
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  useEffect(() => {
    setIsUpdated(JSON.stringify(fields) !== JSON.stringify(updatedFields));
  }, [updatedFields]);
  return { updatedFields, isUpdated, setUpdatedFields, setIsUpdated };
};