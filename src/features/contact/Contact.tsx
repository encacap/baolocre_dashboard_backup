import { Button } from '@chakra-ui/react';
import { Add } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { contactService } from '../../app/services';
import { AxiosErrorType, TableColumnType, TableRowDataType } from '../../app/types/common';
import { ContactDataType } from '../../app/types/contact';
import DeleteConfirmationModal from '../../common/components/confirmationModal/DeleteConfirmationModal';
import LoadingSkeleton from '../../common/components/loading/LoadingSkeleton';
import Table from '../../common/components/table/Table';
import useToast from '../../common/hooks/useToast';
import ContentWrapper from '../../common/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../common/layout/components/content/ContentWrapperBody';
import ContentWrapperHeader from '../../common/layout/components/content/ContentWrapperHeader';
import { getImageURLFromImage } from '../../common/utils/upload';
import ContactDeleteConfirmationModalDescription from './components/ContactDeleteConfirmationModalDescription';
import ContactModifyModal from './components/ContactModifyModal';
import ContactRowAction from './components/ContactRowAction';
import ContactRowActionSkeleton from './components/ContactRowActionSkeleton';
import ContactRowImage from './components/ContactRowImage';

interface ContactRenderedDataType extends Omit<ContactDataType, 'avatar'>, TableRowDataType {
  key: string;
  avatar: JSX.Element;
  actions?: JSX.Element;
}

const Contact = () => {
  const [contactList, setContactList] = useState<ContactDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactDataType | null>(null);
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const toast = useToast();

  const columns: TableColumnType[] = [
    {
      key: 'avatar',
      width: '20',
      skeleton: <LoadingSkeleton className="h-10 w-10 rounded-full" />,
    },
    {
      key: 'name',
      label: 'Tên liên hệ',
    },
    {
      key: 'phone',
      label: 'Số điện thoại',
    },
    {
      key: 'zalo',
      label: 'Zalo',
    },
    {
      key: 'gmail',
      label: 'Gmail',
    },
    {
      key: 'facebook',
      label: 'Facebook',
    },
    {
      key: 'actions',
      label: 'Hành động',
      className: 'text-right',
      textAlign: 'right',
      skeleton: <ContactRowActionSkeleton />,
    },
  ];

  const handleClickAddButton = () => {
    setIsShowModifyModal(true);
  };

  const handleClickEdit = (id: string) => {
    const contact = contactList.find((item) => item.id === id);
    if (!contact) {
      return;
    }
    setSelectedContact(contact);
    setIsShowModifyModal(true);
  };

  const handleClickDelete = (id: string) => {
    const contact = contactList.find((item) => item.id === id);
    if (!contact) {
      return;
    }
    setSelectedContact(contact);
    setIsShowDeleteModal(true);
  };

  const formatDataSource = (dataSource: ContactDataType[]): ContactRenderedDataType[] =>
    dataSource.map((data) => ({
      ...data,
      key: data.id || '',
      avatar: <ContactRowImage alt={data.name || ''} src={getImageURLFromImage(data.avatar, 'thumbnail')} />,
      actions: <ContactRowAction id={data.id || ''} onEdit={handleClickEdit} onDelete={handleClickDelete} />,
    }));

  const getContacts = async () => {
    setIsLoading(true);
    contactService
      .getContacts()
      .then((data) => {
        setContactList(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseModals = () => {
    setIsShowModifyModal(false);
    setIsShowDeleteModal(false);
    setSelectedContact(null);
  };

  const handleFinishModifyModal = () => {
    if (selectedContact) {
      toast.success('Thành công!', 'Đã cập nhật thông tin liên hệ');
    } else {
      toast.success('Thành công!', 'Đã thêm liên hệ mới');
    }
    handleCloseModals();
    getContacts();
  };

  const handleFailedModifyModal = (message?: string) => {
    if (selectedContact) {
      toast.error('Đã xảy ra lỗi khi cập nhật thông tin liên hệ!', message || 'Vui lòng thử lại sau');
    } else {
      toast.error('Đã xảy ra lỗi khi thêm liên hệ!', message || 'Vui lòng thử lại sau');
    }
  };

  const handleCloseDeleteModal = () => {
    setIsShowDeleteModal(false);
    setSelectedContact(null);
  };

  const handleFinishDeleteModal = () => {
    contactService
      .deleteContactById(selectedContact?.id || '')
      .then(() => {
        toast.success('Thành công!', 'Đã xóa liên hệ');
        getContacts();
      })
      .catch((error: AxiosErrorType) => {
        toast.error(
          'Đã xảy ra lỗi khi xóa liên hệ!',
          error?.response?.data?.message || 'Vui lòng thử lại sau',
        );
      })
      .finally(() => {
        handleCloseModals();
      });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Quản lý liên hệ</div>
        <div>
          <Button colorScheme="teal" onClick={handleClickAddButton}>
            <Add className="mr-2" />
            Thêm liên hệ
          </Button>
        </div>
      </ContentWrapperHeader>
      <ContentWrapperBody>
        <Table columns={columns} dataSource={formatDataSource(contactList)} isLoading={isLoading} />
      </ContentWrapperBody>
      <ContactModifyModal
        contact={selectedContact}
        isOpen={isShowModifyModal}
        onClose={handleCloseModals}
        onFinish={handleFinishModifyModal}
        onFailed={handleFailedModifyModal}
      />
      <DeleteConfirmationModal
        isOpen={isShowDeleteModal}
        title="Xóa liên hệ"
        description={<ContactDeleteConfirmationModalDescription contact={selectedContact} />}
        onClose={handleCloseDeleteModal}
        onSubmit={handleFinishDeleteModal}
      />
    </ContentWrapper>
  );
};

export default Contact;
