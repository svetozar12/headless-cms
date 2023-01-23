import { useGetAllFieldTypes } from "../../hooks/useGetAllFields";
import Heading from "../Heading";
import Spinner from "../Spinner";
import Field from "./subcomponents/Field";

const ContentModel = () => {
  const { data, isLoading } = useGetAllFieldTypes();
  if (isLoading || !data) return <Spinner isLoading={isLoading} />;
  return (
    <div className="h-screen bg-offBlack">
      <div className="flex w-full flex-col items-center justify-center">
        <Heading type="h1" text="Fields" className="mb-5" />
        <div className="w-2/5">
          {data?.map(({ name, fieldType }) => {
            return (
              <Field
                key={name}
                type={fieldType || ""}
                title={name || ""}
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
