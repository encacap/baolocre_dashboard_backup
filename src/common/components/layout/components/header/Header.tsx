import { Box, BoxProps } from '@chakra-ui/react';

interface HeaderProps {
  h: BoxProps['h'];
}

const Header = ({ h }: HeaderProps) => {
  return <Box h={h} bg="white" rounded="md" />;
};

export default Header;
