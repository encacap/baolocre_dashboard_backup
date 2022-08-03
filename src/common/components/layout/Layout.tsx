import { Box } from '@chakra-ui/react';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

interface LayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box w="100vw" h="100vh">
      <Sidebar w="72" />
      <Box w="calc(100% - 288px)" ml="288px" mr="0" p="4" bgColor="encacap.100">
        <Header h="16" />
        <Box minH="calc(100vh - 112px)" mt="4" bg="white" rounded="md">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
