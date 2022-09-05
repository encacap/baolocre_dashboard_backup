import { object, string } from 'yup';

const createCategorySchema = object().shape({
  name: string().required('Vui lòng nhập tên danh mục.'),
  description: string(),
  type: string().required('Vui lòng chọn loại danh mục.'),
  image: object().required('Vui lòng chọn ảnh đại diện.'),
});

// eslint-disable-next-line import/prefer-default-export
export { createCategorySchema };
