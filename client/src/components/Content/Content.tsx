import { useRouter } from "next/router";
import React, { useState } from "react";
import { api } from "../../utils/api";
import Field from "./subcomponents/Field";
import { FieldType } from "./subcomponents/Field/Field";
import Heading from "./subcomponents/Heading";

const Content = () => {
  const router = useRouter();
  const { query } = router;
  const [isModal, setIsModal] = useState(false);
  const { data, isFetching } = api.content.get.useQuery(
    parseInt(query.id as string),
  );
  const { data: fieldData } = api.field.getAll.useQuery({
    contentId: parseInt(query.id as string),
  });
  console.log(fieldData);

  const { name } = data || {};
  console.log(fieldData);

  return (
    <div className="h-screen bg-offBlack">
      <div className="flex w-full flex-col items-center justify-center">
        <Heading title={name || ""} isLoading={isFetching} />
        {fieldData?.data.map(({ fieldType: { fieldType }, name }) => (
          <Field fieldType={fieldType as FieldType} fieldTitle={name} />
        ))}
      </div>
    </div>
  );
};

export default Content;
