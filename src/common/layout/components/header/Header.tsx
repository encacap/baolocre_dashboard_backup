import { BoxProps, Flex } from '@chakra-ui/react';

interface HeaderProps {
  h: BoxProps['h'];
}

const Header = ({ h }: HeaderProps) => {
  return <Flex h={h} bg="white" rounded="md" alignItems="center" p="4" />;
};

export default Header;
