import { Button, Modal, ModalContent, ModalOverlay, ModalProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type DeleteConfirmationModalProps = Omit<ModalProps, 'children' | 'className'> & {
  title: string;
  description: string | React.ReactNode;
  preview?: React.ReactNode;
  onSubmit: () => void;
};

const DeleteConfirmationModal = ({
  title,
  description,
  preview,
  isOpen,
  onSubmit,
  onClose,
  ...props
}: DeleteConfirmationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseModal = () => {
    onClose();
  };

  const handleClickSubmit = () => {
    setIsSubmitting(true);
    onSubmit();
  };

  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
    }
  }, [isOpen]);

  return (
    <Modal blockScrollOnMount isCentered isOpen={isOpen} onClose={handleCloseModal} {...props}>
      <ModalOverlay />
      <ModalContent bg="transparent" shadow="none">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  {title}
                </h3>
                <div className="mt-2 mb-1">
                  {preview && <div className="mt-2">{preview}</div>}
                  <p className="whitespace-pre-line text-sm text-gray-500">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-x-4 bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <Button
              type="submit"
              colorScheme="red"
              loadingText="Xác nhận"
              className="ml-4"
              disabled={isSubmitting}
              isLoading={isSubmitting}
              onClick={handleClickSubmit}
            >
              Xác nhận
            </Button>
            <Button
              type="submit"
              colorScheme="teal"
              variant="outline"
              disabled={isSubmitting}
              onClick={onClose}
            >
              Hủy bỏ
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
