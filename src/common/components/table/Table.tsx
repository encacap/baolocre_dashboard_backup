import { Table as ChakraTable, TableContainer } from '@chakra-ui/react';
import { TableColumnType, TableRowDataType } from '../../../app/types/common';
import TableHead from './TableHead';
import TableRow from './TableRow';

interface TableProps {
  columns: TableColumnType[];
  dataSource: TableRowDataType[];
}

const Table = ({ columns, dataSource }: TableProps) => {
  return (
    <TableContainer>
      <ChakraTable colorScheme="gray">
        <TableHead items={columns} />
        <TableRow dataSource={dataSource} columns={columns} />
      </ChakraTable>
    </TableContainer>
  );
};

export default Table;
