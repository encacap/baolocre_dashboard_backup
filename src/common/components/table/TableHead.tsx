import { Thead, Tr } from '@chakra-ui/react';
import { TableColumnType } from '../../../app/types/common';
import TableHeadItem from './TableHeadItem';

interface TableHeadProps {
  items: TableColumnType[];
}

const TableHead = ({ items }: TableHeadProps) => {
  return (
    <Thead>
      <Tr className="overflow-hidden bg-gray-100">
        {items.map(({ key, label, ...columnsRestProp }) => (
          <TableHeadItem key={key} text={label} {...columnsRestProp} />
        ))}
      </Tr>
    </Thead>
  );
};

export default TableHead;
