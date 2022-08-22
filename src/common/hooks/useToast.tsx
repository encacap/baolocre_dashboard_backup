import {
  ToastOptions as ChakraToastOptions,
  useToast as chakraUseToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { AlertProps } from '../../app/types/common';
import ToastMessage from '../components/toast/ToastMessage';

type ToastOptions = Partial<Pick<ChakraToastOptions, 'duration' | 'id' | 'requestClose'>>;

interface ShowToastOptions extends ToastOptions {
  message: string;
  description?: string;
  status: AlertProps['status'];
}

const useToast = () => {
  const chakraToast = chakraUseToast();

  const showToast = (options: ShowToastOptions) => {
    const { id, message, description, status } = options;
    const showToastOptions: UseToastOptions = {
      ...options,
      containerStyle: {
        padding: 2,
      },
      position: 'top-right',
      render: () => <ToastMessage message={message} description={description} status={status} />,
    };

    if (id) {
      if (!chakraToast.isActive(id)) {
        return chakraToast(showToastOptions);
      }
      return chakraToast.update(id, showToastOptions);
    }

    return chakraToast(showToastOptions);
  };

  return {
    ...chakraToast,
    success: (message: string, description?: string, options?: ToastOptions) =>
      showToast({
        ...options,
        message,
        description,
        status: 'success',
      }),
    error: (message: string, description?: string, options?: ToastOptions) =>
      showToast({
        ...options,
        message,
        description,
        status: 'error',
      }),
  };
};

export default useToast;
