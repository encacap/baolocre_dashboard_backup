import {
  Modal as ChakraModal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';

interface ModalProps extends ChakraModalProps {
  title: string;
}

const Modal = ({ title, children, ...props }: ModalProps) => {
  return (
    <ChakraModal {...props}>
      <ModalOverlay />
      <ModalContent className="my-auto py-6 px-7" overflow="visible">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-lg font-semibold text-teal-600">
            {title}
            <div className="mt-5 h-1 w-20 bg-gray-100" />
          </div>
          <ModalCloseButton className="color-gray-100" top={5} right={5} />
        </div>
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
