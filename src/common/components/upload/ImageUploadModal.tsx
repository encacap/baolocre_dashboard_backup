import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { uploadService } from '../../../app/services';
import { AxiosErrorType, FileType } from '../../../app/types/common';
import { ImageType } from '../../../app/types/upload';
import useToast from '../../hooks/useToast';
import { uploadImageFormSchema } from '../../utils/validationSchemas/upload';
import InputGroup from '../InputGroup';
import ImageUploadPlaceholder from './ImageUploadPlaceholder';
import ImageUploadPreview from './ImageUploadPreview';

type ImageUploadModalProps = Omit<ModalProps, 'children' | 'className'> & {
  onClose: () => void;
  onSubmit: (images: ImageType[]) => void;
};

type ImageUploadModalFormDataType = {
  imageUrl: string;
};

const ImageUploadModal = ({ onClose, onSubmit, ...props }: ImageUploadModalProps) => {
  const [currentFileList, setCurrentFileList] = useState<FileType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<ImageUploadModalFormDataType>({
    resolver: yupResolver(uploadImageFormSchema),
    mode: 'onChange',
  });

  const currentImageUrl = watch('imageUrl');

  const toast = useToast();

  const clearModal = () => {
    setCurrentFileList([]);
    clearErrors();
    setValue('imageUrl', '');
  };

  const handleChangeFileInput = (fileList: FileType[] | null) => {
    if (!fileList) {
      return;
    }

    setCurrentFileList((prevFileList) => {
      const newFileList = Array.from(fileList);

      if (prevFileList) {
        return [...prevFileList.filter((image) => !image.response), ...newFileList];
      }

      return Array.from(newFileList);
    });
  };

  const handleRemoveFileInput = (file: FileType) => {
    const newFileList = currentFileList.filter((prevFile) => !_.isEqual(prevFile, file));
    if (file.response) {
      setValue('imageUrl', '');
    }
    setCurrentFileList(newFileList);
  };

  const handleRemoveImageUrl = () => {
    const newFileList = currentFileList.filter((prevFile) => !prevFile.response);
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
        toast.error(
          'Tải lên hình ảnh không thành công!',
          error.response?.data.errors.map((e) => e.message.join(', ')).join(', ') || 'Vui lòng thử lại sau.',
          {
            id: 'uploadImageError',
          },
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (!currentImageUrl) {
      handleRemoveImageUrl();
      return;
    }

    const isValid = uploadImageFormSchema.isValidSync({ imageUrl: currentImageUrl });

    if (!isValid) {
      return;
    }

    handleChangeFileInput([
      {
        id: currentImageUrl,
        response: currentImageUrl,
      },
    ]);
  }, [currentImageUrl]);

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
              />
            ))}
          <ImageUploadPlaceholder
            isCollapsed={!!currentFileList?.length}
            disabled={isSubmitting}
            onChange={handleChangeFileInput}
          />
        </div>
        <InputGroup
          label="Hoặc nhập đường dẫn hình ảnh"
          className="mt-5"
          placeholder="VD: https://example.com/image.png"
          errorMessage={errors?.imageUrl?.message}
          inputProps={register('imageUrl')}
          disabled={isSubmitting}
        />
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
