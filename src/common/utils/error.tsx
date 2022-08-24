import _ from 'lodash';
import { AxiosErrorType } from '../../app/types/common';

const getErrorMessageFromResponse = (error: AxiosErrorType) => {
  const errors = error.response?.data.errors;
  if (!errors || _.isEmpty(errors)) {
    const responseErrorMessage = error.response?.data.message;
    if (!responseErrorMessage) {
      return 'Vui lòng thử lại sau.';
    }
    return responseErrorMessage.concat('.');
  }
  return error.response?.data.errors
    ?.map((e) => e.message.join(', '))
    .join(', ')
    .concat('.');
};

// eslint-disable-next-line import/prefer-default-export
export { getErrorMessageFromResponse };
