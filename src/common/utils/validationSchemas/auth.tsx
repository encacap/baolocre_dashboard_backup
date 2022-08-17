import { object, string } from 'yup';
import { emailSchema } from './common';

const loginFormDataSchema = object({
  email: emailSchema(),
  password: string()
    .required('Vui lòng nhập mật khẩu của bạn.')
    .min(6, (rule) => `Mật khẩu phải có tối thiểu ${rule.min} ký tự.`)
    .max(20),
});

// eslint-disable-next-line import/prefer-default-export
export { loginFormDataSchema };
