import { Box, Center, Text } from '@chakra-ui/react';
import EncacapLogo from '../../common/logo/EncacapLogo';

const Login = () => {
    return (
        <Center width="full" height="100vh">
            <Box minWidth={480} border="1px" borderColor="gray.200" paddingX="8" paddingY="16" rounded="12">
                <Center>
                    <EncacapLogo boxSize="20" fill="teal.400" />
                </Center>
                <Center paddingTop="8">
                    <Text fontSize="2xl" fontWeight="semibold">
                        Chào mừng bạn trở lại!
                    </Text>
                </Center>
                <Center paddingTop="2">Đăng nhập bằng tài khoản Encacap của bạn để tiếp tục.</Center>
            </Box>
        </Center>
    );
};

export default Login;
