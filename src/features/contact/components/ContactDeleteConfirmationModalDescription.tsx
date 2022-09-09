import { ContactDataType } from '../../../app/types/contact';

interface ContactDeleteConfirmationModalDescriptionProps {
  contact: ContactDataType | null;
}

const ContactDeleteConfirmationModalDescription = ({
  contact,
}: ContactDeleteConfirmationModalDescriptionProps) => {
  return (
    <div>
      <div>
        Bạn có chắc muốn xóa liên hệ <b>{contact?.name}</b>?
      </div>
      <div className="mt-1">Thao tác này không thể hoàn tác.</div>
    </div>
  );
};

export default ContactDeleteConfirmationModalDescription;
