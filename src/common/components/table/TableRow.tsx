import { Tbody, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { TableColumnType, TableRowDataType } from '../../../app/types/common';

interface TableRowProps {
  dataSource: TableRowDataType[];
  columns: TableColumnType[];
}

const TableRow = ({ dataSource, columns }: TableRowProps) => {
  return (
    <Tbody>
      {dataSource.map((data) => (
        <Tr key={data.key}>
          {columns.map(({ key: columnKey }) => (
            <Td px="5" py="5" key={columnKey}>
              {(data[columnKey] as React.ReactNode) || '-'}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  );
};

export default TableRow;
