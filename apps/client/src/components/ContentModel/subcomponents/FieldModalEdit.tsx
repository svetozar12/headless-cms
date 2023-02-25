import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useRef } from 'react';
import { FieldtypeFieldType } from '@init/sdk';
import { queryClient } from '../../../pages/_app';

import { api } from '../../../utils/api';

import ActionButtons from '../../ActionButtons';
import Button from '../../Button';
import Modal from '../../Modal';

interface IFieldModalEdit {
  isModal: boolean;
  toggleModal: (value: boolean) => void;
  oldFieldType: FieldtypeFieldType | undefined;
}

const FieldModalEdit: FC<IFieldModalEdit> = ({
  isModal,
  toggleModal,
  oldFieldType,
}) => {
  const router = useRouter();
  const { data } = api.fieldTypeEnums.getAll.useQuery();
  const { mutate, isLoading } = api.fieldType.updateById.useMutation({
    onSuccess: () => {
      const queryKeyFieldType = api.fieldType.getQueryKey();
      const queryKeyModel = api.contentModel.getQueryKey();
      queryClient.invalidateQueries(queryKeyModel);
      queryClient.invalidateQueries(queryKeyFieldType);
      toggleModal(false);
    },
  });
  const { fieldName, fieldType } = useValues();

  const getFIelds = () => {
    return [
      {
        name: 'fieldTitle',
        ref: fieldName,
        defaultValue: oldFieldType?.name,
      },
    ];
  };

  const handleSubmit = () => {
    const fieldTitle = fieldName.current?.value;
    const fieldTypeName = fieldType.current?.value;
    if (!oldFieldType) return;

    mutate({
      id: oldFieldType?.id,
      request: {
        name: fieldTitle || oldFieldType.name,
        fieldType: fieldTypeName || oldFieldType.fieldType,
        contentModelId: oldFieldType.contentModelId,
      },
    });
  };

  const render = () => {
    return (
      <Modal
        onOverlayClick={() => toggleModal(false)}
        isOpen={isModal}
        isLoading={isLoading}
      >
        {getFIelds().map(({ name, ref, defaultValue }) => {
          return (
            <FormControl
              key={name}
              className="!bg-inputBlack w-full bg-transparent !my-2 !rounded-md"
            >
              <InputLabel className="!text-white">{name}</InputLabel>
              <Input
                defaultValue={defaultValue}
                inputRef={ref}
                className="!px-2 bg-transparent !text-white autofill:bg-transparent active:border-0"
              />
            </FormControl>
          );
        })}
        <FormControl className="!bg-inputBlack w-full bg-transparent !my-2 !rounded-md">
          <InputLabel className="!text-white">Field Type</InputLabel>
          <Select
            defaultValue={oldFieldType?.fieldType}
            className="!px-2 bg-transparent !text-white autofill:bg-transparent active:border-0"
            label="field type"
            inputRef={fieldType}
          >
            {data?.map(({ title, type }) => {
              return (
                <MenuItem key={title} value={type}>
                  {title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <ActionButtons
          buttons={[
            {
              Render: (
                <Button
                  text="Update"
                  onClick={async () => await handleSubmit()}
                  type="button"
                />
              ),
            },
            {
              Render: (
                <Button
                  text="Cancel"
                  onClick={() => toggleModal(false)}
                  type="button"
                  extraProps={{
                    style: { border: '1px solid rgba(0,0,0,0.1)' },
                    className: 'bg-white !text-black hover:!border-mainPurple',
                  }}
                />
              ),
            },
          ]}
        />
      </Modal>
    );
  };

  return <>{render()}</>;
};

export default FieldModalEdit;

const useValues = () => {
  const fieldName = useRef<HTMLInputElement>(null);
  const fieldType = useRef<HTMLInputElement>(null);

  return { fieldName, fieldType };
};
