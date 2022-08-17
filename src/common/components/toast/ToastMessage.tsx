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
  const containerColorByStatus: ColorByStatusType = {
    info: 'blue',
    error: 'red',
    success: 'bg-green-200',
    warning: 'yellow',
  };

  const iconColorByStatus: ColorByStatusType = {
    info: 'blue',
    error: 'red',
    success: 'text-green-500',
    warning: 'yellow',
  };

  return (
    <div className={twMerge(containerColorByStatus[status], 'flex rounded-lg  p-4')}>
      <AlertIcon status={status} variant="Bold" className={iconColorByStatus[status]} />
      <div className="ml-3">
        <span className={twMerge(description && 'mr-1 font-semibold')}>{message}</span>
        {description && <span className="mt-1">{description}</span>}
      </div>
    </div>
  );
};

export default ToastMessage;
