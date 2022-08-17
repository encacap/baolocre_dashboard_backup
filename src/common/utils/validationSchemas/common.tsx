import { string } from 'yup';

const phoneSchema = (invalidMessage?: string, isRequired = true) => {
  const schema = string().matches(/^[0-9]{10}$/, invalidMessage || 'Số điện thoại không hợp lệ.');

  if (isRequired) {
    return schema.required('Vui lòng nhập số điện thoại của bạn.');
  }

  return schema;
};

const emailSchema = (invalidMessage?: string, isRequired = true) => {
  const schema = string().email(invalidMessage || 'Email không hợp lệ.');

  if (isRequired) {
    return schema.required('Vui lòng nhập email của bạn.');
  }

  return schema;
};

export { phoneSchema, emailSchema };
