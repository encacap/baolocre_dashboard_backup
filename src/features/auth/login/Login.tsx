import { Box, Button, Center, Input, InputGroup, Text, Wrap } from '@chakra-ui/react';
import EncacapLogo from '../../common/logo/EncacapLogo';

const Login = () => {
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
        <Wrap marginTop="12" spacing="4" padding="2">
          <InputGroup>
            <Input placeholder="Tài khoản" size="lg" />
          </InputGroup>
          <InputGroup marginTop="4">
            <Input placeholder="Mật khẩu" size="lg" />
          </InputGroup>
          <Button colorScheme="teal" marginTop="4" width="full" size="lg">
            Đăng nhập
          </Button>
        </Wrap>
      </Box>
    </Center>
  );
};

export default Login;
