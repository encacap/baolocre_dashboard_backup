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
      <Flex alignItems="center" bgColor={isSelected ? 'teal.100' : 'white'} w="full" p="4" rounded="lg">
        {cloneElement(icon, {
          color: isSelected ? 'teal.600' : 'black',
          boxSize: '6',
        })}
        <Box ml="4" color={isSelected ? 'teal.600' : 'black'} fontWeight="semibold">
          {label}
        </Box>
      </Flex>
    </Link>
  );
};

export default SidebarMenuItem;
