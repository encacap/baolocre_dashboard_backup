import { Button } from '@chakra-ui/react';
import { Add } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { contactService } from '../../app/services';
import { TableColumnType, TableRowDataType } from '../../app/types/common';
import { ContactDataType } from '../../app/types/contact';
import LoadingSkeleton from '../../common/components/loading/LoadingSkeleton';
import Table from '../../common/components/table/Table';
import ContentWrapper from '../../common/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../common/layout/components/content/ContentWrapperBody';
import ContentWrapperHeader from '../../common/layout/components/content/ContentWrapperHeader';
import { getImageURLFromImage } from '../../common/utils/upload';
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

  const handleClickEdit = (id: string) => {
    // eslint-disable-next-line no-console
    console.log(id);
  };

  const handleClickDelete = (id: string) => {
    // eslint-disable-next-line no-console
    console.log(id);
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

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Quản lý liên hệ</div>
        <div>
          <Button colorScheme="teal">
            <Add className="mr-2" />
            Thêm liên hệ
          </Button>
        </div>
      </ContentWrapperHeader>
      <ContentWrapperBody>
        <Table columns={columns} dataSource={formatDataSource(contactList)} isLoading={isLoading} />
      </ContentWrapperBody>
    </ContentWrapper>
  );
};

export default Contact;
