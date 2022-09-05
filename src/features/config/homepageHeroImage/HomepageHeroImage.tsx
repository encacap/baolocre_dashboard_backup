import { Spinner, useDisclosure } from '@chakra-ui/react';
import { AddSquare } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { configService } from '../../../app/services';
import { ImageDataType } from '../../../app/types/props';
import DeleteConfirmationModal from '../../../common/components/confirmationModal/DeleteConfirmationModal';
import ImageUploadModal from '../../../common/components/upload/ImageUploadModal';
import useToast from '../../../common/hooks/useToast';
import { getErrorMessageFromResponse } from '../../../common/utils/error';
import HomepageHeroImageItem from './components/HomepageHeroImageItem';

const HomepageHeroImage = () => {
  const toast = useToast();

  const {
    isOpen: isOpenUploadImageModal,
    onOpen: onOpenUploadImageModal,
    onClose: onCloseUploadImageModal,
  } = useDisclosure();

  const [imageList, setImageList] = useState<ImageDataType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isShowDeleteConfirmationModal, setIsShowDeleteConfirmationModal] = useState(false);
  const [selectedToDeleteImage, setSelectedToDeleteImage] = useState<ImageDataType>();

  const handleConfirmUpdate = (images: ImageDataType[]) => {
    setIsSubmitting(true);
    configService
      .addHomepageHeroImages(images.map((image) => image.id))
      .then(setImageList)
      .catch((error) => {
        toast.error('Thêm hình ảnh mới không thành công!', getErrorMessageFromResponse(error), {
          id: 'uploadImageError',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleClickDelete = (image: ImageDataType) => {
    setSelectedToDeleteImage(image);
    setIsShowDeleteConfirmationModal(true);
  };

  const handleCloseDeleteConfirmationModal = () => setIsShowDeleteConfirmationModal(false);

  const handleConfirmDelete = () => {
    if (!selectedToDeleteImage) return;
    configService
      .deleteHomepageHeroImageById(selectedToDeleteImage.id)
      .then((data) => {
        setImageList(data);
        toast.success('Xóa hình ảnh thành công!');
      })
      .finally(() => {
        setIsShowDeleteConfirmationModal(false);
        setSelectedToDeleteImage(undefined);
      });
  };

  useEffect(() => {
    configService.getHomepageHeroImages().then(setImageList);
  }, []);

  return (
    <>
      <div className="border-t-2 border-gray-100 pt-5">
        <div className="text-lg font-semibold text-teal-600">Hình ảnh giới thiệu</div>
        <div className="relative">
          <div className="mt-4 grid grid-cols-4 gap-4">
            {imageList.map((image) => (
              <HomepageHeroImageItem key={image.id} image={image} onDelete={handleClickDelete} />
            ))}
            <div
              className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-transparent bg-gray-100 text-gray-400 duration-100 hover:border-gray-200 hover:text-gray-500"
              onClick={onOpenUploadImageModal}
              role="button"
              tabIndex={0}
            >
              {isSubmitting ? <Spinner boxSize={6} /> : <AddSquare size="24" />}
              <div className="mt-2 text-sm font-semibold">{isSubmitting ? 'Đang xử lý' : 'Thêm ảnh'}</div>
            </div>
          </div>
          {isSubmitting && <div className="absolute inset-0 bg-white bg-opacity-60" />}
        </div>
      </div>
      <ImageUploadModal
        isOpen={isOpenUploadImageModal}
        onClose={onCloseUploadImageModal}
        onSubmit={handleConfirmUpdate}
      />
      <DeleteConfirmationModal
        title="Xóa hình ảnh"
        description={
          <div>
            <div>Bạn có chắc chắn muốn xóa vĩnh viễn hình ảnh này?</div>
            <div>Thao tác này không thể hoàn lại.</div>
          </div>
        }
        isOpen={isShowDeleteConfirmationModal}
        onClose={handleCloseDeleteConfirmationModal}
        onSubmit={handleConfirmDelete}
      />
    </>
  );
};

export default HomepageHeroImage;
