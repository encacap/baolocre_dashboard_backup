import { Add } from 'iconsax-react';
import { FileType } from '../../../app/types/common';
import { getImageURLFromFile } from '../../utils/upload';

interface UploadImagePreviewProps {
  file: FileType;
  onRemove: (file: FileType) => void;
}

const UploadImagePreview = ({ file, onRemove }: UploadImagePreviewProps) => {
  return (
    <div className="relative aspect-video h-20 w-full rounded-lg border-2 border-gray-100 p-2 duration-100 hover:border-gray-200">
      <img src={getImageURLFromFile(file)} className="h-full w-full object-contain object-center" alt="" />
      <div
        className="absolute -top-3 -right-3 h-6 w-6 rotate-45 cursor-pointer rounded-full border-2 border-red-500 bg-white text-red-500 duration-100 hover:-rotate-45"
        role="button"
        tabIndex={0}
        onClick={() => onRemove(file)}
      >
        <Add size="20" />
      </div>
    </div>
  );
};

export default UploadImagePreview;
