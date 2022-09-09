import { Tbody, Td, Tr } from '@chakra-ui/react';
import { TableColumnType } from '../../../app/types/common';
import LoadingSkeleton from '../loading/LoadingSkeleton';

interface TableRowSkeletonProps {
  columns: TableColumnType[];
}

const TableRowSkeleton = ({ columns }: TableRowSkeletonProps) => {
  const rowArray = Array.from({ length: 3 }, (_, index) => index);

  return (
    <Tbody>
      {rowArray.map((key) => (
        <Tr key={key}>
          {columns.map(({ key: columnKey, skeleton }) => (
            <Td px="5" py="5" key={columnKey}>
              {skeleton || <LoadingSkeleton className="h-4" />}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableRowSkeleton;
