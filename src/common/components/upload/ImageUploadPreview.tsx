import { Add } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';
import { FileType } from '../../../app/types/common';
import { getImageURLFromFile } from '../../utils/upload';

interface ImageUploadPreviewProps {
  file: FileType;
  disabled?: boolean;
  onRemove: (file: FileType) => void;
}

const ImageUploadPreview = ({ file, disabled, onRemove }: ImageUploadPreviewProps) => {
  const handleRemove = () => {
    if (disabled) {
      return;
    }
    onRemove(file);
  };

  return (
    <div
      className={twMerge(
        'relative aspect-video h-20 w-full rounded-lg border-2 border-gray-100 p-2 duration-100',
        !disabled && 'hover:border-gray-200',
      )}
    >
      <img src={getImageURLFromFile(file)} className="h-full w-full object-contain object-center" alt="" />
      <div
        className={twMerge(
          'absolute -top-3 -right-3 h-6 w-6 rotate-45 cursor-pointer rounded-full border-2 border-red-500 bg-white text-red-500 duration-100',
          disabled ? 'border-gray-200 text-gray-200' : 'hover:-rotate-45',
        )}
        role="button"
        tabIndex={0}
        onClick={() => handleRemove()}
      >
        <Add size="20" />
      </div>
    </div>
  );
};

export default ImageUploadPreview;
