import { object, string } from 'yup';

const loginFormDataSchema = object({
  email: string()
    .required('Vui lòng nhập địa chỉ email của bạn.')
    .email('Địa chỉ email của bạn không hợp lệ.'),
  password: string()
    .required('Vui lòng nhập mật khẩu của bạn.')
    .min(6, (rule) => `Mật khẩu phải có tối thiểu ${rule.min} ký tự.`)
    .max(20),
});

// eslint-disable-next-line import/prefer-default-export
export { loginFormDataSchema };
