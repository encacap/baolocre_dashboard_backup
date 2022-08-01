import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import EncacapLogo from '../EncacapLogo';

const PrepareOverlay = () => {
  return (
    <Center pos="fixed" top="0" bottom="0" right="0" left="0" bg="white">
      <Flex direction="column" alignItems="center">
        <EncacapLogo boxSize="20" />
        <Flex mt="8" alignItems="center">
          <Spinner boxSize="5" mr="4" color="blue.500" speed="0.6s" />
          <Box>Đang tải dữ liệu. Vui lòng chờ...</Box>
        </Flex>
      </Flex>
    </Center>
  );
};

export default PrepareOverlay;
