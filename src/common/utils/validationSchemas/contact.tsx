import { object, string } from 'yup';

const modifyContactSchema = object().shape({
  name: string().required('Vui lòng nhập tên liên hệ.').nullable(),
  phone: string().required('Vui lòng nhập số điện thoại.').nullable(),
  email: string().email().nullable(),
  zalo: string().nullable(),
  facebook: string().url().nullable(),
  avatar: object().required('Vui lòng chọn ảnh đại diện').nullable(),
});

// eslint-disable-next-line import/prefer-default-export
export { modifyContactSchema };
