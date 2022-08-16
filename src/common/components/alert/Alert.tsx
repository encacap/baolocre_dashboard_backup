import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { AlertProps } from '../../../app/types/common';
import AlertIcon from './AlertIcon';

const Alert = (
  { status = 'info', message, description, descriptionProps, className, ...props }: AlertProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const colorClassName = {
    info: 'text-blue-500 bg-blue-100',
    success: 'text-green-500',
    warning: 'text-orange-500',
    error: 'text-red-500 bg-red-100',
  };

  return (
    <div ref={ref} className={twMerge('flex rounded-lg p-4', colorClassName[status], className)} {...props}>
      <AlertIcon className="mr-4 flex-shrink-0" status={status} />
      <div>
        {message && <div className="mb-1 font-semibold">{message}</div>}
        <div {...descriptionProps}>{description}</div>
      </div>
    </div>
  );
};

export default forwardRef(Alert);
