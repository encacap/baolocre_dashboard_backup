import { array, object, string } from 'yup';

const imageUploadFormSchema = object({
  imageUrls: array().of(
    object().shape({
      url: string().url('Đường dẫn hình ảnh không hợp lệ!'),
    }),
  ),
});

// eslint-disable-next-line import/prefer-default-export
export { imageUploadFormSchema };
