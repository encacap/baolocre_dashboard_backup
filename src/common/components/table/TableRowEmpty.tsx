import { FolderOpen } from 'iconsax-react';

const TableRowEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-400">
      <FolderOpen size={60} variant="Bulk" className="text-gray-300" />
      <div className="mt-3 text-sm">Hiện không có dữ liệu</div>
    </div>
  );
};

export default TableRowEmpty;
