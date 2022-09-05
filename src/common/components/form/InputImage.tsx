import { forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FileType } from '../../../app/types/common';
import { ImageDataType, InputImageProps } from '../../../app/types/props';
import ImageUploadModal from '../upload/ImageUploadModal';
import ImageUploadPlaceholder from '../upload/ImageUploadPlaceholder';
import ImageUploadPreview from '../upload/ImageUploadPreview';

const InputImage = (
  { value, multiple, onChange }: InputImageProps,
  ref?: React.LegacyRef<HTMLInputElement>,
) => {
  const [isShowUploadModal, setIsShowUploadModal] = useState(false);

  const handleChangeInput = (images: ImageDataType[]) => {
    if (multiple) {
      onChange?.([...(value || []), ...images]);
      return;
    }
    onChange?.([images[0]]);
  };

  const handleRemove = (image: FileType) => {
    onChange?.(value?.filter((i) => i.id !== image.id) || []);
  };

  return (
    <>
      <div
        ref={ref}
        className={twMerge(
          !!value?.length && multiple && 'grid grid-cols-4 gap-4',
          !!value?.length && !multiple && 'grid aspect-video w-full grid-cols-1 gap-4',
          !value?.length && 'aspect-video w-full',
        )}
      >
        {value?.map((image) => (
          <ImageUploadPreview
            key={image.id}
            file={image}
            onRemove={handleRemove}
            className={twMerge(multiple ? 'h-20' : 'h-full')}
          />
        ))}
        {multiple ||
          (!multiple && !value?.length && (
            <ImageUploadPlaceholder
              isCollapsed={!!value?.length}
              onClick={() => setIsShowUploadModal(true)}
            />
          ))}
      </div>
      <ImageUploadModal
        isOpen={isShowUploadModal}
        blockScrollOnMount={false}
        multiple={multiple}
        onClose={() => setIsShowUploadModal(false)}
        onSubmit={handleChangeInput}
      />
    </>
  );
};

export default forwardRef(InputImage);
