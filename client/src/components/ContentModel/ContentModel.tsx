import React, { useEffect, useState } from "react";
import { useGetContentModel } from "../../hooks/useGetContentModel";
import Heading from "../Heading";
import Spinner from "../Spinner";
// import { GenericObject } from "../../utils/common";
import Field from "./subcomponents/Field";
// import ModelHeading from "./subcomponents/Heading";
// import ActionButtons from "./subcomponents/Heading/subcomponents/ActionButtons";

const ContentModel = () => {
  const { data, isLoading } = useGetContentModel();
  // const { isUpdated, updatedFields, setUpdatedFields } =
  //   useIsFieldsUpdated(fields);
  if (isLoading || !data) return <Spinner isLoading={isLoading} />;
  const {
    data: { id, name, userId },
  } = data;

  return (
    <div className="h-screen bg-offBlack">
      {/* <ModelHeading
        title={title || ""}
        ActionButtons={
          <ActionButtons isUpdated={isUpdated} updatedFields={updatedFields} />
        }
      /> */}
      <div className="flex w-full flex-col items-center justify-center">
        <Heading type="h1" text="Fields" className="mb-5" />
        <div className="w-2/5">
          {FIeld.map(({ title, type }) => {
            return (
              <Field
                key={title}
                type={type}
                title={title}
                // setUpdatedFields={setUpdatedFields}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContentModel;

// const useIsFieldsUpdated = (fields: GenericObject) => {
//   const [updatedFields, setUpdatedFields] = useState<Record<string, any>>({});
//   const [isUpdated, setIsUpdated] = useState<boolean>(false);

//   useEffect(() => {
//     setIsUpdated(JSON.stringify(fields) !== JSON.stringify(updatedFields));
//   }, [updatedFields]);
//   return { updatedFields, isUpdated, setUpdatedFields, setIsUpdated };
// };
