import { Button, ModalProps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { CategoryTypeEnum } from '../../../app/enums/data';
import { categoryService } from '../../../app/services';
import { AxiosErrorType } from '../../../app/types/common';
import { ImageDataType } from '../../../app/types/props';
import InputGroup from '../../../common/components/form/InputGroup';
import Modal from '../../../common/components/Modal';
import { createCategorySchema } from '../../../common/utils/validationSchemas/category';

type CategoryModifyModalProps = Omit<ModalProps, 'children' | 'className'> & {
  onClose: () => void;
  onFinish: () => void;
};

interface CategoryFormDataType {
  name: string;
  description: string;
  slug?: string;
  type: CategoryTypeEnum;
  image?: ImageDataType;
}

const CategoryModifyModal = ({ onClose, onFinish, ...props }: CategoryModifyModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    reset,
  } = useForm<CategoryFormDataType>({
    resolver: yupResolver(createCategorySchema),
  });

  const handleCloseModal = () => {
    reset();
    onClose();
  };

  const handleFinish = handleSubmit((data) => {
    return categoryService
      .createCategory(data)
      .then(() => {
        reset();
        onFinish();
      })
      .catch((error: AxiosErrorType) => {
        const responseErrors = error?.response?.data.errors;
        if (responseErrors) {
          responseErrors.forEach((responseError) => {
            setError(responseError.field as keyof CategoryFormDataType, {
              type: 'manual',
              message: responseError.message.join(', '),
            });
          });
        }
      });
  });

  return (
    <Modal
      title="Thêm danh mục mới"
      size="xl"
      blockScrollOnMount
      isCentered
      closeOnOverlayClick
      onClose={handleCloseModal}
      {...props}
    >
      <form onSubmit={handleFinish} className="space-y-4 pb-2">
        <div className="grid grid-cols-2 gap-x-6">
          <InputGroup
            label="Tên danh mục"
            placeholder="Nhập tên danh mục"
            errorMessage={errors.name?.message}
            inputProps={{ ...register('name') }}
          />
          <InputGroup
            type="select"
            label="Loại danh mục"
            placeholder="Chọn loại danh mục"
            errorMessage={errors.type?.message}
            options={[
              {
                label: 'Bất động sản',
                value: CategoryTypeEnum.ESTATE,
              },
              {
                label: 'Tin tức',
                value: CategoryTypeEnum.NEWS,
              },
            ]}
            selectProps={{ ...register('type') }}
          />
        </div>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <InputGroup
              type="file"
              label="Hình ảnh đại diện"
              placeholder="Chọn hình ảnh đại diện cho danh mục"
              errorMessage={errors.image?.message}
              imageInputProps={{
                value: field.value ? [field.value] : [],
                onChange: (images) => field.onChange(images[0]),
              }}
            />
          )}
        />
        <div className="pt-3">
          <Button
            type="submit"
            colorScheme="teal"
            className="w-full"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Hoàn thành
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryModifyModal;
