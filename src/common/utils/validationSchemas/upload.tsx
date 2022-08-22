import { object, string } from 'yup';

const uploadImageFormSchema = object({
  imageUrl: string().url('Đường dẫn hình ảnh không hợp lệ!'),
});

// eslint-disable-next-line import/prefer-default-export
export { uploadImageFormSchema };
