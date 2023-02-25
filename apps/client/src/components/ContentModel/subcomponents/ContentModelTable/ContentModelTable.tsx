import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import {
  ContentmodelContentModel,
  ModelsPaginationModelArrayFieldtypeFieldType,
} from '@init/sdk';
import { api } from '../../../../utils/api';
import ActionButtons from '../../../ActionButtons';
import Button from '../../../Button';
import Table, { IColumn } from '../../../Table/Table';
import FieldModalEdit from '../FieldModalEdit';
import ConfirmDeleteModal from './subcomponents/ConfirmDeleteModal';

const ContentModelTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [model, setModel] = useState<{ id: number | null; title: string }>({
    id: null,
    title: '',
  });
  const router = useRouter();
  const { query } = router;
  const { data, isFetching } = api.fieldType.getAll.useQuery({
    limit: 10,
    offSet: parseInt(query.page as string) || 1,
  });
  const columns: IColumn[] = [
    { title: 'Title', dataIndexes: ['name'] },
    { title: 'Field Type', dataIndexes: ['fieldType'] },
    {
      title: 'Action',
      render: (fieldProps: ContentmodelContentModel) => (
        <ActionButtons
          buttons={[
            {
              Render: (
                <Button
                  Icon={MdDelete}
                  onClick={(e: ChangeEvent) => {
                    e.stopPropagation();

                    const { id, name } = fieldProps;
                    setIsDelete(true);
                    setModel({ id, title: name });
                  }}
                  type="button"
                  extraProps={{ className: 'relative z-20' }}
                />
              ),
            },
            {
              Render: (
                <Button
                  Icon={MdEdit}
                  onClick={() => {
                    const { id, name } = fieldProps;
                    setModel({ id, title: name });
                    setIsEdit(true);
                  }}
                  type="button"
                  extraProps={{ className: 'relative z-20' }}
                />
              ),
            },
          ]}
        />
      ),
    },
  ];
  return (
    <div className={`relative ${isFetching && 'h-60'}`}>
      <Table
        isLoading={isFetching}
        columns={columns}
        dataSource={data as ModelsPaginationModelArrayFieldtypeFieldType}
      />
      {isDelete && (
        <ConfirmDeleteModal
          isDeleteModal={isDelete}
          setIsDeleteModal={setIsDelete}
          fieldTypeId={model.id as number}
          fieldTypeTitle={model.title}
        />
      )}
      <FieldModalEdit
        isModal={isEdit}
        toggleModal={setIsEdit}
        oldFieldType={data?.data?.find(({ id }) => id === model.id)}
      />
    </div>
  );
};

export default ContentModelTable;
