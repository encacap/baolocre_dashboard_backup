import { Box, BoxProps, Flex, Icon } from '@chakra-ui/react';
import { Element3, Setting3 } from 'iconsax-react';
import { SidebarMenuItemsType as SidebarMenuItemType } from '../../../../../app/types/common';
import EncacapLogo from '../../../EncacapLogo';
import SidebarMenu from './SidebarMenu';

interface SidebarProps {
  w: BoxProps['w'];
}

const Sidebar = ({ w }: SidebarProps) => {
  const sidebarItems: SidebarMenuItemType[] = [
    {
      key: 'dashboard',
      icon: <Icon as={Element3} />,
      label: 'Tổng quan',
      path: '/',
    },
    {
      key: 'configs',
      icon: <Icon as={Setting3} />,
      label: 'Cài đặt chung',
      path: '/configs',
    },
  ];

  return (
    <Box w={w} pos="fixed" insetY="0" px="5" py="1" zIndex="1300" borderRight="1px" borderColor="gray.100">
      <Flex alignItems="center" h="24">
        <EncacapLogo boxSize="12" mx="4" />
      </Flex>
      <SidebarMenu items={sidebarItems} />
    </Box>
  );
};

export default Sidebar;
