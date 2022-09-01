import { Table as ChakraTable, TableContainer } from '@chakra-ui/react';
import { TableColumnType, TableRowDataType } from '../../../app/types/common';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableRowSkeleton from './TableRowSkeleton';

interface TableProps {
  columns: TableColumnType[];
  dataSource: TableRowDataType[];
  isLoading?: boolean;
}

const Table = ({ columns, dataSource, isLoading }: TableProps) => {
  return (
    <TableContainer>
      <ChakraTable colorScheme="gray">
        <TableHead items={columns} />
        {isLoading ? (
          <TableRowSkeleton columns={columns} />
        ) : (
          <TableRow dataSource={dataSource} columns={columns} />
        )}
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
