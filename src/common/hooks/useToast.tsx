import { ToastOptions as ChakraToastOptions, useToast as chakraUseToast } from '@chakra-ui/react';
import ToastMessage from '../components/toast/ToastMessage';

type ToastOptions = Pick<ChakraToastOptions, 'duration' | 'id' | 'requestClose'>;

const useToast = () => {
  const chakraToast = chakraUseToast();

  return {
    ...chakraToast,
    success: (message: string, description?: string, options?: ToastOptions) =>
      chakraToast({
        ...options,
        position: 'top-right',
        render: () => <ToastMessage message={message} description={description} status="success" />,
      }),
  };
};

export default useToast;
