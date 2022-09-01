import { Button } from '@chakra-ui/react';
import { Add } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { CategoryTypeEnum } from '../../app/enums/data';
import { categoryService } from '../../app/services';
import { CategoryItemType } from '../../app/types/category';
import { TableColumnType, TableRowDataType } from '../../app/types/common';
import LoadingSkeleton from '../../common/components/loading/LoadingSkeleton';
import Table from '../../common/components/table/Table';
import ContentWrapper from '../../common/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../common/layout/components/content/ContentWrapperBody';
import ContentWrapperHeader from '../../common/layout/components/content/ContentWrapperHeader';
import { getImageURLFromImage } from '../../common/utils/upload';
import CategoryRowAction from './components/CategoryRowAction';
import CategoryRowActionSkeleton from './components/CategoryRowActionSkeleton';
import CategoryRowImage from './components/CategoryRowImage';

interface CategoryRenderedItemType extends Omit<CategoryItemType, 'image' | 'type'>, TableRowDataType {
  image: JSX.Element;
  actions?: JSX.Element;
  type: string;
}

const Category = () => {
  const [categoryList, setCategoryList] = useState<CategoryItemType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns: TableColumnType[] = [
    {
      key: 'image',
      width: '20',
      skeleton: <LoadingSkeleton className="h-10 w-10 rounded-full" />,
    },
    {
      key: 'name',
      label: 'Tên danh mục',
    },
    {
      key: 'slug',
      label: 'SLUG',
    },
    {
      key: 'type',
      label: 'Loại bài viết',
    },
    {
      key: 'actions',
      label: 'Hành động',
      className: 'text-right',
      textAlign: 'right',
      skeleton: <CategoryRowActionSkeleton />,
    },
  ];

  const getCategoryTypeNameByType = (type: CategoryTypeEnum) => {
    if (type === CategoryTypeEnum.ESTATE) {
      return 'Bất động sản';
    }
    if (type === CategoryTypeEnum.NEWS) {
      return 'Tin tức';
    }
    return 'Khác';
  };

  const handleClickEdit = (id: string) => {
    // eslint-disable-next-line no-console
    console.log('handleClickEdit', id);
  };

  const handleClickDelete = (id: string) => {
    // eslint-disable-next-line no-console
    console.log('handleClickDelete', id);
  };

  const formatDataSource = (dataSource: CategoryItemType[]): CategoryRenderedItemType[] =>
    dataSource.map((data) => ({
      ...data,
      key: data.id,
      type: getCategoryTypeNameByType(data.type),
      image: <CategoryRowImage alt={data.name} src={getImageURLFromImage(data.image, 'public')} />,
      actions: <CategoryRowAction id="1" onEdit={handleClickEdit} onDelete={handleClickDelete} />,
    }));

  useEffect(() => {
    setIsLoading(true);
    categoryService
      .getCategories()
      .then(setCategoryList)
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Quản lý danh mục</div>
        <div>
          <Button colorScheme="teal">
            <Add className="mr-2" />
            Thêm danh mục
          </Button>
        </div>
      </ContentWrapperHeader>
      <ContentWrapperBody>
        <Table columns={columns} dataSource={formatDataSource(categoryList)} isLoading={isLoading} />
      </ContentWrapperBody>
    </ContentWrapper>
  );
};

export default Category;
