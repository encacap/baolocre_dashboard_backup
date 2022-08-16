import { Button } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import Alert from '../../common/components/Alert/Alert';
import InputGroup from '../../common/components/InputGroup';

const SEO = () => {
  const alertRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const resizeDescriptionTextarea = () => {
    const alertRefElement = alertRef.current;
    const descriptionElement = descriptionRef.current;
    const descriptionTextareaElement = descriptionElement?.querySelector('textarea');
    if (!alertRefElement || !descriptionElement || !descriptionTextareaElement) {
      return;
    }
    descriptionTextareaElement.style.height = `${190 - alertRefElement.offsetHeight}px`;
  };

  useEffect(() => {
    resizeDescriptionTextarea();

    window.addEventListener('resize', resizeDescriptionTextarea);

    return () => {
      window.removeEventListener('resize', resizeDescriptionTextarea);
    };
  }, [alertRef]);

  return (
    <div className="border-t-2 border-gray-100 pt-4">
      <div className="text-lg font-semibold text-teal-600">SEO</div>
      <Alert
        ref={alertRef}
        status="info"
        description="Cài đặt SEO cho toàn trang. Bạn có thể thay đổi cài đặt cho từng bài viết ở phần chi tiết bài viết."
        className="mt-4"
      />
      <div className="mt-5 grid gap-y-3 pb-2">
        <InputGroup label="Tiêu đề" placeholder="VD: Bất động sản nghỉ dưỡng Bảo Lộc" />
        <InputGroup
          type="textarea"
          label="Mô tả"
          placeholder="VD: Chuyên mua bán bất động sản nghỉ dưỡng tại Bảo Lộc."
          ref={descriptionRef}
        />
        <InputGroup label="Từ khóa" placeholder="VD: bat dong san, nghi duong, bao loc, ..." />
        <Button type="submit" colorScheme="teal" marginTop="4" width="full">
          Cập nhật
        </Button>
      </div>
    </div>
  );
};

export default SEO;
