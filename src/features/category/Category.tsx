import { Button } from '@chakra-ui/react';
import { Add } from 'iconsax-react';
import { useEffect, useState } from 'react';
import { CategoryTypeEnum } from '../../app/enums/data';
import { categoryService } from '../../app/services';
import { CategoryItemType } from '../../app/types/category';
import { AxiosErrorType, TableColumnType, TableRowDataType } from '../../app/types/common';
import DeleteConfirmationModal from '../../common/components/confirmationModal/DeleteConfirmationModal';
import LoadingSkeleton from '../../common/components/loading/LoadingSkeleton';
import Table from '../../common/components/table/Table';
import useToast from '../../common/hooks/useToast';
import ContentWrapper from '../../common/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../common/layout/components/content/ContentWrapperBody';
import ContentWrapperHeader from '../../common/layout/components/content/ContentWrapperHeader';
import { getImageURLFromImage } from '../../common/utils/upload';
import CategoryDeleteConfirmationModalDescription from './components/CategoryDeleteConfirmationModalDescription';
import CategoryModifyModal from './components/CategoryModifyModal';
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
  const [selectedCategory, setSelectedCategory] = useState<CategoryItemType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const toast = useToast();

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
    const category = categoryList.find((item) => item.id === id);
    if (!category) {
      return;
    }
    setSelectedCategory(category);
  };

  const handleClickDelete = (id: string) => {
    const category = categoryList.find((item) => item.id === id);
    if (!category) {
      return;
    }
    setSelectedCategory(category);
    setIsShowDeleteModal(true);
  };

  const formatDataSource = (dataSource: CategoryItemType[]): CategoryRenderedItemType[] =>
    dataSource.map((data) => ({
      ...data,
      key: data.id,
      type: getCategoryTypeNameByType(data.type),
      image: <CategoryRowImage alt={data.name} src={getImageURLFromImage(data.image, 'public')} />,
      actions: <CategoryRowAction id={data.id} onEdit={handleClickEdit} onDelete={handleClickDelete} />,
    }));

  const getCategoryList = () => {
    setIsLoading(true);
    categoryService
      .getCategories()
      .then(setCategoryList)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFinishModifyCategory = () => {
    if (selectedCategory) {
      toast.success('Thành công!', 'Đã cập nhật thông tin danh mục');
    } else {
      toast.success('Thành công!', 'Đã thêm mới danh mục');
    }
    setIsShowModifyModal(false);
    getCategoryList();
  };

  const handleConfirmDeleteCategory = () => {
    if (!selectedCategory) {
      return;
    }
    categoryService
      .deleteCategoryById(selectedCategory.id)
      .then(() => {
        toast.success('Thành công!', 'Đã xóa danh mục');
        getCategoryList();
        setSelectedCategory(null);
      })
      .catch((error: AxiosErrorType) => {
        toast.error('Đã xảy ra lỗi khi xóa danh mục!', error.response?.data.message);
      })
      .finally(() => {
        setIsShowDeleteModal(false);
      });
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Quản lý danh mục</div>
        <div>
          <Button colorScheme="teal" onClick={() => setIsShowModifyModal(true)}>
            <Add className="mr-2" />
            Thêm danh mục
          </Button>
        </div>
      </ContentWrapperHeader>
      <ContentWrapperBody>
        <Table columns={columns} dataSource={formatDataSource(categoryList)} isLoading={isLoading} />
      </ContentWrapperBody>
      <CategoryModifyModal
        isOpen={isShowModifyModal}
        onClose={() => setIsShowModifyModal(false)}
        onFinish={handleFinishModifyCategory}
      />
      <DeleteConfirmationModal
        title="Xóa danh mục"
        description={<CategoryDeleteConfirmationModalDescription category={selectedCategory} />}
        isOpen={isShowDeleteModal}
        onSubmit={handleConfirmDeleteCategory}
        onClose={() => setIsShowDeleteModal(false)}
      />
    </ContentWrapper>
  );
};

export default Category;
