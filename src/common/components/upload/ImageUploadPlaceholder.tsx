import { Image } from 'iconsax-react';
import { twMerge } from 'tailwind-merge';

interface ImageUploadPlaceholderProps {
  isCollapsed: boolean;
  isReplaced?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  onClick?: () => void;
  onChange?: (fileList: File[] | null) => void;
}

const ImageUploadPlaceholder = ({
  disabled,
  multiple = false,
  className,
  isCollapsed,
  isReplaced = false,
  onChange,
  onClick,
}: ImageUploadPlaceholderProps) => {
  const handleChangeFileList = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }
    onChange?.(Array.from(fileList).map((file) => new File([file], file.name)));
    e.target.value = '';
  };

  return (
    <div
      className={twMerge('group relative h-full w-full duration-100', isCollapsed && 'h-20', className)}
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <div
        className={twMerge(
          'flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-100 bg-gray-50 p-10 text-gray-400 duration-100',
          isCollapsed && 'w-full border-gray-100 p-2',
          !disabled && 'group-hover:border-gray-200 group-hover:bg-gray-100',
        )}
      >
        <Image size={32} />
        {!isCollapsed ? (
          <div className="mt-4 text-center text-sm">Nhấn vào đây để chọn hình ảnh từ máy tính của bạn.</div>
        ) : (
          <div className="mt-1.5 text-center text-xs">{isReplaced ? 'Thay đổi' : 'Thêm ảnh'}</div>
        )}
      </div>
      {!onClick && (
        <input
          type="file"
          className="absolute inset-0 cursor-pointer opacity-0 disabled:cursor-default"
          multiple={multiple}
          disabled={disabled}
          onChange={handleChangeFileList}
        />
      )}
    </div>
  );
};

export default ImageUploadPlaceholder;
