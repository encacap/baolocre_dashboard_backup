import { Button, ModalProps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CategoryTypeEnum } from '../../../app/enums/data';
import { categoryService } from '../../../app/services';
import { CategoryItemType } from '../../../app/types/category';
import { AxiosErrorType } from '../../../app/types/common';
import InputGroup from '../../../common/components/form/InputGroup';
import Modal from '../../../common/components/Modal';
import { createCategorySchema } from '../../../common/utils/validationSchemas/category';

type CategoryModifyModalProps = Omit<ModalProps, 'children' | 'className'> & {
  category: CategoryItemType | null;
  onClose: () => void;
  onFinish: () => void;
  onFailed: (error: string) => void;
};

const CategoryModifyModal = ({
  category,
  onClose,
  onFinish,
  onFailed,
  ...props
}: CategoryModifyModalProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const formDefaultValue = {
    name: null,
    slug: null,
    description: null,
    type: null,
    image: null,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setError,
    setValue,
  } = useForm<CategoryItemType>({
    resolver: yupResolver(createCategorySchema),
    defaultValues: formDefaultValue,
  });

  const handleCloseModal = () => {
    reset(formDefaultValue);
    onClose();
  };

  const handleResponseError = (error: AxiosErrorType) => {
    const responseErrors = error?.response?.data.errors;
    if (responseErrors) {
      responseErrors.forEach((responseError) => {
        setError(responseError.field as keyof CategoryItemType, {
          type: 'manual',
          message: responseError.message.join(', '),
        });
      });
      return;
    }
    onFailed?.(error.response?.data.message || 'Vui lòng thử lại sau');
  };

  const handleCreateCategory = async (data: CategoryItemType) => {
    return categoryService
      .createCategory(data)
      .then(() => {
        reset();
        onFinish();
      })
      .catch(handleResponseError);
  };

  const handleUpdateCategory = async (data: CategoryItemType) => {
    if (!category || !category.id) return null;
    return categoryService
      .updateCategoryById(category.id, data)
      .then(() => {
        reset();
        onFinish();
      })
      .catch(handleResponseError);
  };

  const handleFinish = handleSubmit((data) => {
    if (category) {
      return handleUpdateCategory(data);
    }
    return handleCreateCategory(data);
  });

  useEffect(() => {
    if (!category || _.isEmpty(category)) {
      setIsLoading(false);
      return;
    }
    setValue('name', category.name);
    setValue('description', category?.description || '');
    setValue('slug', category.slug);
    setValue('type', category.type);
    setValue('image', category.image);
    setIsLoading(false);
  }, [category]);

  return (
    <Modal
      title={category ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
      size="xl"
      blockScrollOnMount
      isCentered
      closeOnOverlayClick
      onClose={handleCloseModal}
      {...props}
    >
      <form onSubmit={handleFinish} className="space-y-4 pb-2">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <InputGroup
            label="Tên danh mục"
            placeholder="Nhập tên danh mục"
            errorMessage={errors.name?.message}
            inputProps={{ ...register('name') }}
            isRequired
            disabled={isLoading}
          />
          <InputGroup
            label="SLUG"
            placeholder="Nhập SLUG"
            errorMessage={errors.slug?.message}
            inputProps={{
              ...register('slug'),
            }}
            disabled={isLoading}
          />
          <InputGroup
            type="select"
            label="Loại danh mục"
            placeholder="Chọn loại danh mục"
            className="col-span-2"
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
            isRequired
            disabled={isLoading}
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
                onChange: (images) => field.onChange(images[0] || null),
              }}
              isRequired
              disabled={isLoading}
            />
          )}
        />
        <div className="pt-3">
          <Button
            type="submit"
            colorScheme="teal"
            className="w-full"
            disabled={isSubmitting || isLoading}
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
