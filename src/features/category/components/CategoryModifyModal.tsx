import { ModalProps } from '@chakra-ui/react';
import Modal from '../../../common/components/Modal';

type CategoryModifyModalProps = Omit<ModalProps, 'children' | 'className'> & {
  onClose: () => void;
};

const CategoryModifyModal = ({ onClose, ...props }: CategoryModifyModalProps) => {
  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Modal
      title="Thêm danh mục mới"
      blockScrollOnMount
      isCentered
      closeOnOverlayClick
      onClose={handleCloseModal}
      {...props}
    >
      Thêm cái gì đó vào đây
    </Modal>
  );
};

export default CategoryModifyModal;
