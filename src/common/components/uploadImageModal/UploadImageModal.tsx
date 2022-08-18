import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import { Image } from 'iconsax-react';
import InputGroup from '../InputGroup';

type UploadImageModalProps = Omit<ModalProps, 'children' | 'className'>;

const UploadImageModal = (props: UploadImageModalProps) => {
  return (
    <Modal blockScrollOnMount isCentered closeOnOverlayClick {...props}>
      <ModalOverlay />
      <ModalContent className="py-6 px-7">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-teal-600">Tải lên hình ảnh của bạn</div>
          <ModalCloseButton className="color-gray-100" top={5} right={5} />
        </div>
        <div className="mt-6 flex flex-col items-center justify-center rounded-lg border-4 border-dashed border-gray-100 bg-gray-50 p-10 text-gray-400">
          <Image size="32" />
          <div className="mt-4 text-center text-sm">Nhấn vào đây để chọn hình ảnh từ máy tính của bạn.</div>
        </div>
        <InputGroup
          label="Hoặc nhập đường dẫn hình ảnh"
          className="mt-4"
          placeholder="VD: https://example.com/image.png"
        />
        <Button colorScheme="teal" className="mt-6">
          Xác nhận
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default UploadImageModal;
