import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useState } from 'react';
import { FieldArrayWithId, useFieldArray, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { uploadService } from '../../../app/services';
import { AxiosErrorType, FileType } from '../../../app/types/common';
import { ImageDataType } from '../../../app/types/upload';
import useToast from '../../hooks/useToast';
import { getErrorMessageFromResponse } from '../../utils/error';
import { imageUploadFormSchema } from '../../utils/validationSchemas/upload';
import InputGroup from '../InputGroup';
import ImageUploadPlaceholder from './ImageUploadPlaceholder';
import ImageUploadPreview from './ImageUploadPreview';

type ImageUploadModalProps = Omit<ModalProps, 'children' | 'className'> & {
  onClose: () => void;
  onSubmit: (images: ImageDataType[]) => void;
};

type ImageURLItemType = {
  url: string;
};

type ImageUploadModalFormDataType = {
  imageUrls: ImageURLItemType[];
};

const ImageUploadModal = ({ onClose, onSubmit, ...props }: ImageUploadModalProps) => {
  const [currentFileList, setCurrentFileList] = useState<FileType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultFormValues = {
    imageUrls: [
      {
        url: '',
      },
    ],
  };

  const {
    register,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<ImageUploadModalFormDataType>({
    resolver: yupResolver(imageUploadFormSchema),
    mode: 'onChange',
    defaultValues: defaultFormValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'imageUrls',
  });

  const toast = useToast();

  const clearModal = () => {
    setCurrentFileList([]);
    clearErrors();
    setValue('imageUrls', defaultFormValues.imageUrls);
    setIsSubmitting(false);
  };

  const handleChangeFileInput = (fileList: FileType[] | null) => {
    if (!fileList) {
      return;
    }

    setCurrentFileList((prevFileList) => {
      const newFileList = Array.from(fileList);

      if (prevFileList) {
        return [...prevFileList, ...newFileList];
      }

      return Array.from(newFileList);
    });
  };

  const handleRemoveFileInput = (file: FileType) => {
    const newFileList = currentFileList.filter((prevFile) => !_.isEqual(prevFile, file));
    if (file.response) {
      const removedIndex = fields.findIndex((field) => field.url === file.response);
      remove(removedIndex);
    }
    setCurrentFileList(newFileList);
  };

  const handleCloseModal = () => {
    clearModal();
    onClose();
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    uploadService
      .uploadImages(currentFileList, 'other')
      .then((images) => {
        onSubmit(images);
        handleCloseModal();
      })
      .catch((error: AxiosErrorType) => {
        toast.error('Tải lên hình ảnh không thành công!', getErrorMessageFromResponse(error), {
          id: 'uploadImageError',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChangeImageUrl = (url: string, field: FieldArrayWithId<ImageUploadModalFormDataType>) => {
    if (!url) {
      return;
    }
    imageUploadFormSchema
      .validate({
        imageUrls: [{ url }],
      })
      .then(() => {
        handleChangeFileInput([
          {
            id: String(field.id),
            response: url,
          },
        ]);
        append({
          url: '',
        });
      })
      .catch(() => {
        // TODO: Do something...
      });
  };

  return (
    <Modal blockScrollOnMount isCentered closeOnOverlayClick onClose={handleCloseModal} {...props}>
      <ModalOverlay />
      <ModalContent className="py-6 px-7">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-teal-600">Tải lên hình ảnh của bạn</div>
          <ModalCloseButton className="color-gray-100" top={5} right={5} />
        </div>
        <div className={twMerge('mt-6', !!currentFileList?.length && 'grid grid-cols-4 gap-4')}>
          {currentFileList &&
            Array.from(currentFileList).map((file, index) => (
              <ImageUploadPreview
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                file={file}
                onRemove={handleRemoveFileInput}
                disabled={isSubmitting}
              />
            ))}
          <ImageUploadPlaceholder
            isCollapsed={!!currentFileList?.length}
            disabled={isSubmitting}
            onChange={handleChangeFileInput}
          />
        </div>
        {fields.map((field, index) => (
          <InputGroup
            key={field.id}
            label={index === 0 ? 'Hoặc nhập đường dẫn hình ảnh' : undefined}
            className={index === 0 ? 'mt-5' : 'mt-3'}
            placeholder="VD: https://example.com/image.png"
            errorMessage={errors?.imageUrls?.[index]?.url?.message}
            inputProps={{
              autoComplete: 'off',
              ...register(`imageUrls.${index}.url`, {
                onChange: (e) => handleChangeImageUrl(e.target.value, field),
              }),
              autoFocus: !field.url,
            }}
            disabled={isSubmitting || !!field.url}
          />
        ))}
        <Button
          isLoading={isSubmitting}
          colorScheme="teal"
          className="mt-7"
          disabled={!currentFileList.length || isSubmitting}
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ImageUploadModal;
