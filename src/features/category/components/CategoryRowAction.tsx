import { Tooltip } from '@chakra-ui/react';
import { Edit, Trash } from 'iconsax-react';

interface CategoryRowActionProps {
  id: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CategoryRowAction = ({ id, onDelete, onEdit }: CategoryRowActionProps) => {
  return (
    <div className="flex items-center justify-end space-x-3 text-sm">
      <Tooltip label="Chỉnh sửa" hasArrow>
        <Edit size="22" className="cursor-pointer hover:text-teal-500" onClick={() => onEdit(id)} />
      </Tooltip>
      <Tooltip label="Xóa" hasArrow>
        <Trash size="22" className="cursor-pointer hover:text-red-500" onClick={() => onDelete(id)} />
      </Tooltip>
    </div>
  );
};

export default CategoryRowAction;
