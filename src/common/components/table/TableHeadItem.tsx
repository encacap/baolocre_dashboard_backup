import { TableHeadProps, Th } from '@chakra-ui/react';
import { twMerge } from 'tailwind-merge';

interface TableHeadItem extends TableHeadProps {
  text?: string;
  className?: string;
}

const TableHeadItem = ({ text, className, textAlign, width }: TableHeadItem) => {
  return (
    <Th
      className={twMerge('first:rounded-l-lg last:rounded-r-lg', className)}
      px="5"
      py="5"
      borderBottom="none"
      textAlign={textAlign}
      w={width}
    >
      {text && text}
    </Th>
  );
};

export default TableHeadItem;
