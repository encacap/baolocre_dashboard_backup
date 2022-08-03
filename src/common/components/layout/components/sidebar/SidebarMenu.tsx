import { Box, Wrap } from '@chakra-ui/react';
import { createRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SidebarMenuItemsType } from '../../../../../app/types/common';
import SidebarMenuItem from './SidebarMenuItem';

interface SidebarMenuProps {
  items: SidebarMenuItemsType[];
}

const SidebarMenu = ({ items }: SidebarMenuProps) => {
  const { pathname } = useLocation();

  const sidebarItemWrapperRef = createRef<HTMLDivElement>();
  const sidebarItemActivatedMaskRef = createRef<HTMLDivElement>();

  const getActiveStatus = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.includes(path);
  };

  useEffect(() => {
    const sidebarItemWrapper = sidebarItemWrapperRef.current;
    const sidebarItemActivatedMask = sidebarItemActivatedMaskRef.current;
    if (!sidebarItemWrapper || !sidebarItemActivatedMask) {
      return;
    }
    const activatedItem = sidebarItemWrapper.querySelector('.active') as HTMLDivElement;
    if (activatedItem) {
      const activatedItemRect = activatedItem.getBoundingClientRect();
      const activatedItemHeight = activatedItemRect.height;
      const activatedItemTop = activatedItem.offsetTop;

      sidebarItemActivatedMask.style.height = `${activatedItemHeight}px`;
      sidebarItemActivatedMask.style.top = `${activatedItemTop}px`;

      sidebarItemActivatedMask.classList.add('duration-150');
    }
  }, [pathname]);

  return (
    <Box className="relative mt-6">
      <Wrap spacingY="2" className="relative z-10" ref={sidebarItemWrapperRef}>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.key}
            path={item.path}
            icon={item.icon}
            label={item.label}
            isSelected={getActiveStatus(item.path)}
          />
        ))}
      </Wrap>
      <Box
        className="h-14 z-0 absolute rounded-md bg-teal-100 w-full top-0"
        ref={sidebarItemActivatedMaskRef}
      />
    </Box>
  );
};

export default SidebarMenu;
