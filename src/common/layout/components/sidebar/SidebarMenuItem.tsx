import { Box, Flex } from '@chakra-ui/react';
import { cloneElement } from 'react';
import { Link } from 'react-router-dom';

interface SidebarMenuItemProps {
  path: string;
  icon: React.ReactElement;
  label: string;
  isSelected?: boolean;
}

const SidebarMenuItem = ({ path, icon, label, isSelected = false }: SidebarMenuItemProps) => {
  return (
    <Link to={path} className="w-full">
      <Flex className={`item-center w-full rounded-lg py-3 pl-5 pr-4 ${isSelected && 'active'}`}>
        {cloneElement(icon, {
          color: isSelected ? 'teal.600' : 'black',
          boxSize: '6',
        })}
        <Box className="ml-4 font-semibold" color={isSelected ? 'teal.600' : 'black'}>
          {label}
        </Box>
      </Flex>
    </Link>
  );
};

export default SidebarMenuItem;
