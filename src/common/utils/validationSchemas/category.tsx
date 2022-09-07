import { object, string } from 'yup';

const createCategorySchema = object().shape({
  name: string().required('Vui lòng nhập tên danh mục.').nullable(),
  description: string().nullable(),
  type: string().required('Vui lòng chọn loại danh mục.').nullable(),
  image: object().required('Vui lòng chọn ảnh đại diện.').nullable(),
  slug: string().test('slug', 'SLUG hợp lệ phải có dạng: danh-muc', (value) => {
    const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return regex.test(value || '');
  }),
});

// eslint-disable-next-line import/prefer-default-export
export { createCategorySchema };
