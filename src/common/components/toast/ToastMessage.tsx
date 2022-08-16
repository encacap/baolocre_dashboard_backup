import { twMerge } from 'tailwind-merge';
import { AlertProps } from '../../../app/types/common';
import AlertIcon from '../alert/AlertIcon';

interface ToastMessageProps {
  message: string;
  description?: string;
  status?: AlertProps['status'];
}

type ColorByStatusType = {
  [key in Required<AlertProps>['status']]: string;
};

const ToastMessage = ({ message, description, status = 'info' }: ToastMessageProps) => {
  const colorByStatus: ColorByStatusType = {
    info: 'blue',
    error: 'red',
    success: 'text-green-700',
    warning: 'yellow',
  };

  return (
    <div
      className={twMerge(
        colorByStatus[status],
        'flex rounded-lg border-2 border-gray-100 bg-white p-4 shadow-lg shadow-gray-100',
      )}
    >
      <AlertIcon status={status} />
      <div className="ml-4">
        <div className={twMerge(description && 'font-semibold')}>{message}</div>
        {description && <div className="mt-1">{description}</div>}
      </div>
    </div>
  );
};

export default ToastMessage;
