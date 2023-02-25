import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { api } from '../../utils/api';
import Spinner from '../Spinner';
import Field from './subcomponents/Field';
import { FieldType } from './subcomponents/Field/Field';
import Heading from './subcomponents/Heading';

const Content = () => {
  const router = useRouter();
  const { query } = router;
  const [isModal, setIsModal] = useState(false);
  const { data, isFetching } = api.content.get.useQuery(
    parseInt(query.id as string)
  );
  const { data: fieldData } = api.field.getAll.useQuery({
    contentId: parseInt(query.id as string),
  });

  const { name } = data || {};

  return (
    <div className="h-screen bg-offBlack">
      <div className="flex relative w-full flex-col items-center justify-center">
        <Heading title={name || ''} isLoading={isFetching} />
        {isFetching ? (
          <Spinner isLoading={isFetching} />
        ) : (
          fieldData?.data.map(({ fieldType: { fieldType, id }, name }) => (
            <Field
              key={id}
              fieldType={fieldType as FieldType}
              fieldTitle={name}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Content;
