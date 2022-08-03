import { Wrap } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { SidebarMenuItemsType } from '../../../../../app/types/common';
import SidebarMenuItem from './SidebarMenuItem';

interface SidebarMenuProps {
  items: SidebarMenuItemsType[];
}

const SidebarMenu = ({ items }: SidebarMenuProps) => {
  const { pathname } = useLocation();

  return (
    <Wrap spacingY="2" mt="6">
      {items.map((item) => (
        <SidebarMenuItem
          key={item.key}
          path={item.path}
          icon={item.icon}
          label={item.label}
          isSelected={pathname.includes(item.path)}
        />
      ))}
    </Wrap>
  );
};

export default SidebarMenu;
