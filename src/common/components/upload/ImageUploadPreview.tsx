import { Trash } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';
import { FileType } from '../../../app/types/common';
import { getImageURLFromFile } from '../../utils/upload';

interface ImageUploadPreviewProps {
  file: FileType;
  disabled?: boolean;
  className?: string;
  onRemove: (file: FileType) => void;
}

const ImageUploadPreview = ({ file, disabled, className, onRemove }: ImageUploadPreviewProps) => {
  const handleRemove = () => {
    if (disabled) {
      return;
    }
    onRemove(file);
  };

  return (
    <div
      className={twMerge(
        'group relative aspect-video h-20 w-full overflow-hidden rounded-lg border-2 border-gray-100 p-2 duration-100',
        !disabled && 'hover:border-gray-200',
        className,
      )}
    >
      <img
        src={getImageURLFromFile(file)}
        className="h-full w-full rounded-md bg-black object-contain object-center"
        alt=""
      />
      {!disabled && (
        <div className="absolute inset-2 flex items-center justify-center rounded-md bg-black bg-opacity-60 opacity-0 duration-100 group-hover:opacity-100">
          <div
            className={twMerge(
              'flex h-6 w-6 cursor-pointer items-center justify-center text-white duration-100',
              disabled && 'border-gray-200 text-gray-200',
            )}
            role="button"
            tabIndex={0}
            onClick={() => handleRemove()}
          >
            <Trash size="20" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;
