import { Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { TableColumnType, TableRowDataType } from '../../../app/types/common';
import TableLoadingOverlay from './TableLoadingOverlay';
import TableRowEmpty from './TableRowEmpty';

interface TableRowProps {
  dataSource: TableRowDataType[];
  columns: TableColumnType[];
  isLoading?: boolean;
}

const TableRow = ({ dataSource, columns, isLoading }: TableRowProps) => {
  return (
    <Tbody className="relative">
      {!!dataSource.length &&
        dataSource.map((data, rowIndex) => (
          <Tr key={data.key}>
            {columns.map(({ key: columnKey }, columnIndex) => (
              <Td px="5" py="5" key={columnKey}>
                {isLoading && rowIndex === 0 && columnIndex === 0 && <TableLoadingOverlay />}
                {(data[columnKey] as React.ReactNode) || '-'}
              </Td>
            ))}
          </Tr>
        ))}
      {!dataSource.length && !isLoading && (
        <Tr>
          <Td colSpan={columns.length} textAlign="center" py="5">
            <TableRowEmpty />
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};

export default TableRow;
