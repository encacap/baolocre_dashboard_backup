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
        {isLoading && !dataSource.length && <TableRowSkeleton columns={columns} />}
        {dataSource && <TableRow dataSource={dataSource} columns={columns} isLoading={isLoading} />}
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
