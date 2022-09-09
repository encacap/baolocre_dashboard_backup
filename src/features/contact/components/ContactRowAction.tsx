import { Tooltip } from '@chakra-ui/react';
import { Edit, Trash } from 'iconsax-react';

interface ContactRowActionProps {
  id: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ContactRowAction = ({ id, onDelete, onEdit }: ContactRowActionProps) => {
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

export default ContactRowAction;
