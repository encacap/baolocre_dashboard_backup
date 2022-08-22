import { useDisclosure } from '@chakra-ui/react';
import UploadImageModal from '../../common/components/upload/UploadImageModal';

const HomePageHeroSlider = () => {
  const {
    isOpen: isOpenUploadImageModal,
    onOpen: onOpenUploadImageModal,
    onClose: onCloseUploadImageModal,
  } = useDisclosure();

  return (
    <>
      <div className="border-t-2 border-gray-100 pt-5">
        <div className="text-lg font-semibold text-teal-600">Hình ảnh giới thiệu</div>
        <div className="mt-4 grid gap-y-3">
          <div
            className="aspect-video w-full rounded-lg bg-gray-100"
            onClick={onOpenUploadImageModal}
            role="button"
            tabIndex={0}
          />
        </div>
      </div>
      <UploadImageModal isOpen={isOpenUploadImageModal} onClose={onCloseUploadImageModal} />
    </>
  );
};

export default HomePageHeroSlider;
