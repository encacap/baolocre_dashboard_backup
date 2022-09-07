import { forwardRef, useState } from 'react';
import { FileType } from '../../../app/types/common';
import { ImageDataType, InputImageProps } from '../../../app/types/props';
import ImageUploadModal from '../upload/ImageUploadModal';
import ImageUploadPlaceholder from '../upload/ImageUploadPlaceholder';
import ImageUploadPreview from '../upload/ImageUploadPreview';

const InputImage = (
  { value, multiple, isInvalid, onChange }: InputImageProps,
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
      <div ref={ref} className="grid grid-cols-5 gap-4">
        {value?.map((image) => (
          <ImageUploadPreview
            key={image.id}
            file={image}
            onRemove={handleRemove}
            className="aspect-square h-auto w-full"
          />
        ))}
        <ImageUploadPlaceholder
          className="aspect-square h-auto"
          isCollapsed
          isReplaced={!multiple && !!value?.length}
          isInvalid={isInvalid}
          onClick={() => setIsShowUploadModal(true)}
        />
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
