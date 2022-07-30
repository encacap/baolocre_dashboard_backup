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
import { useForm } from 'react-hook-form';
import EncacapLogo from '../../../common/logo/EncacapLogo';
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

  const handleFinish = handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 2000);
    });
  });

  return (
    <Center width="full" height="100vh">
      <Box width={480} border="1px" borderColor="gray.200" paddingX="10" paddingY="16" rounded="12">
        <Box>
          <Center>
            <EncacapLogo boxSize="20" fill="teal.400" />
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
    </Center>
  );
};

export default Login;
