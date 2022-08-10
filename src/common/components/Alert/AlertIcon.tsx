import { InfoCircle, Warning2 } from 'iconsax-react';
import { AlertProps } from '../../../app/types/common';

interface AlertIconProps {
  status?: AlertProps['status'];
  className?: string;
}

const AlertIcon = ({ status, ...props }: AlertIconProps) => {
  switch (status) {
    case 'info':
      return <InfoCircle {...props} />;
    case 'error':
      return <Warning2 {...props} />;
    default:
      return null;
  }
};

export default AlertIcon;
