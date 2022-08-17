import { object, string } from 'yup';
import { phoneSchema } from './common';

const updateContactInformationSchema = object({
  address: string().required('Vui lòng nhập địa chỉ của bạn.'),
  phoneNumber: phoneSchema(),
  zalo: phoneSchema('Số điện thoại Zalo không hợp lệ.'),
  facebook: string().url('Địa chỉ facebook không hợp lệ.'),
  youtube: string().url('Địa chỉ youtube không hợp lệ.'),
});

// eslint-disable-next-line import/prefer-default-export
export { updateContactInformationSchema };
