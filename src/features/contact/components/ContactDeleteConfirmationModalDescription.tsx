import { CategoryItemType } from '../../../app/types/category';

interface ContactDeleteConfirmationModalDescriptionProps {
  category: CategoryItemType | null;
}

const ContactDeleteConfirmationModalDescription = ({
  category,
}: ContactDeleteConfirmationModalDescriptionProps) => {
  return (
    <div>
      <div>
        Bạn có chắc muốn xóa danh mục <b>{category?.name}</b>?
      </div>
      <div className="mt-1">
        Thao tác này không thê hoàn tác. Tất cả các bài viết thuộc danh mục này sẽ bị xóa.
      </div>
    </div>
  );
};

export default ContactDeleteConfirmationModalDescription;
