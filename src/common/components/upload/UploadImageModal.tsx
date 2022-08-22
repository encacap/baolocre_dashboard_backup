import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { FileType } from '../../../app/types/common';
import { uploadImageFormSchema } from '../../utils/validationSchemas/upload';
import InputGroup from '../InputGroup';
import UploadImagePlaceholder from './UploadImagePlaceholder';
import UploadImagePreview from './UploadImagePreview';

type UploadImageModalProps = Omit<ModalProps, 'children' | 'className'> & {
  onClose: () => void;
};

type UploadImageModalFormDataType = {
  imageUrl: string;
};

const UploadImageModal = ({ onClose, ...props }: UploadImageModalProps) => {
  const [currentFileList, setCurrentFileList] = useState<FileType[]>([]);

  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
    watch,
  } = useForm<UploadImageModalFormDataType>({
    resolver: yupResolver(uploadImageFormSchema),
    mode: 'onChange',
  });

  const currentImageUrl = watch('imageUrl');

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
    setCurrentFileList([]);
    clearErrors();
    setValue('imageUrl', '');
    onClose();
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
              <UploadImagePreview
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                file={file}
                onRemove={handleRemoveFileInput}
              />
            ))}
          <UploadImagePlaceholder isCollapsed={!!currentFileList?.length} onChange={handleChangeFileInput} />
        </div>
        <InputGroup
          label="Hoặc nhập đường dẫn hình ảnh"
          className="mt-5"
          placeholder="VD: https://example.com/image.png"
          errorMessage={errors?.imageUrl?.message}
          inputProps={register('imageUrl')}
        />
        <Button colorScheme="teal" className="mt-7" disabled={!currentFileList.length}>
          Xác nhận
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default UploadImageModal;
