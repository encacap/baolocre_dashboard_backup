import {
  Box,
  Button,
  Center,
  Collapse,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Wrap,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { UNAUTHORIZED } from 'http-status';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AUTHENTICATION_PATH } from '../../../app/constants/URL';
import { authService } from '../../../app/services';
import { setUser } from '../../../app/slices/userSlice';
import { AxiosErrorType } from '../../../app/types/common';
import Alert from '../../../common/components/Alert/Alert';
import EncacapLogo from '../../../common/components/EncacapLogo';
import useDispatch from '../../../common/hooks/useDispatch';
import { loginFormDataSchema } from '../../../common/utils/validationSchemas/auth';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    formState: { errors: formErrors, isDirty, isValid, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormDataSchema),
    mode: 'all',
  });

  const [formCommonError, setFormCommonError] = useState<string>();

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    const redirectTo = searchParams.get('from');
    if (redirectTo) {
      navigate(redirectTo, {
        replace: true,
      });
    } else {
      navigate(AUTHENTICATION_PATH.REDIRECT_AFTER_AUTH_PATH, {
        replace: true,
      });
    }
  };

  const handleFinish = handleSubmit((data) => {
    setFormCommonError(undefined);

    return authService
      .loginWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        dispatch(setUser(response.data.data.user));
        authService.saveAuthTokens(response.data.data.accessToken, response.data.data.refreshToken);
        redirectAfterLogin();
      })
      .catch((error: AxiosErrorType) => {
        const statusCode = error.response?.data?.statusCode;
        if (statusCode === UNAUTHORIZED) {
          setFormCommonError('Tên đăng nhập hoặc mật khẩu không chính xác.');
          return;
        }
        setFormCommonError('Có lỗi xảy ra, vui lòng thử lại sau.');
      });
  });

  return (
    <Box width="full" height="100vh" display="flex" overflow="auto" py="4">
      <Box
        width={480}
        border="1px"
        borderColor="gray.200"
        paddingX="10"
        paddingTop="16"
        paddingBottom="14"
        rounded="12"
        m="auto"
      >
        <Box>
          <Center>
            <EncacapLogo boxSize="20" />
          </Center>
          <Center paddingTop="8">
            <Text fontSize="2xl" fontWeight="semibold">
              Chào mừng bạn trở lại!
            </Text>
          </Center>
          <Center paddingTop="3">
            <Text width="80%" align="center">
              Đăng nhập bằng tài khoản Encacap của bạn để tiếp tục.
            </Text>
          </Center>
        </Box>
        <form onSubmit={handleFinish}>
          <Wrap marginTop="12" spacing="4" padding="2">
            {formCommonError && (
              <Alert status="error" message="Đăng nhập không thành công!" description={formCommonError} />
            )}
            <FormControl isInvalid={!!formErrors?.email?.message}>
              <Input placeholder="Tài khoản" size="lg" {...register('email')} />
              <Collapse in={!!formErrors?.email?.message} endingHeight={26}>
                <FormErrorMessage>{formErrors?.email?.message}</FormErrorMessage>
              </Collapse>
            </FormControl>
            <FormControl isInvalid={!!formErrors?.password?.message} marginTop="4">
              <Input type="password" placeholder="Mật khẩu" size="lg" {...register('password')} />
              <Collapse in={!!formErrors?.password?.message} endingHeight={26}>
                <FormErrorMessage>{formErrors?.password?.message}</FormErrorMessage>
              </Collapse>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              marginTop="4"
              width="full"
              size="lg"
              disabled={!isValid || !isDirty || isSubmitting}
              isLoading={isSubmitting}
            >
              Đăng nhập
            </Button>
          </Wrap>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
