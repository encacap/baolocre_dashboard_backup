import { AddCircle, Image } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';

interface UploadImagePlaceholderProps {
  isCollapsed: boolean;
  onChange: (fileList: File[] | null) => void;
}

const UploadImagePlaceholder = ({ isCollapsed, onChange }: UploadImagePlaceholderProps) => {
  const handleChangeFileList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }
    onChange(Array.from(fileList).map((file) => new File([file], file.name)));
    e.target.value = '';
  };

  return (
    <div className={twMerge('group relative h-full w-full duration-100', isCollapsed && 'h-20')}>
      <div
        className={twMerge(
          'flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-100 bg-gray-50 p-10 text-gray-400 duration-100 group-hover:border-gray-200 group-hover:bg-gray-100',
          isCollapsed && 'h-full w-full border-gray-100 p-2',
        )}
      >
        {isCollapsed ? <AddCircle size={32} /> : <Image size={32} />}
        {!isCollapsed && (
          <div className="mt-4 text-center text-sm">Nhấn vào đây để chọn hình ảnh từ máy tính của bạn.</div>
        )}
      </div>
      <input
        type="file"
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={handleChangeFileList}
      />
    </div>
  );
};

export default UploadImagePlaceholder;
