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
      label: 'T??n danh m???c',
    },
    {
      key: 'slug',
      label: 'SLUG',
    },
    {
      key: 'type',
      label: 'Lo???i b??i vi???t',
    },
    {
      key: 'actions',
      label: 'H??nh ?????ng',
      className: 'text-right',
      textAlign: 'right',
      skeleton: <CategoryRowActionSkeleton />,
    },
  ];

  const getCategoryTypeNameByType = (type: CategoryTypeEnum) => {
    if (type === CategoryTypeEnum.ESTATE) {
      return 'B???t ?????ng s???n';
    }
    if (type === CategoryTypeEnum.NEWS) {
      return 'Tin t???c';
    }
    return 'Kh??c';
  };

  const handleClickEdit = (id: string) => {
    const category = categoryList.find((item) => item.id === id);
    if (!category) {
      return;
    }
    setSelectedCategory(category);
    setIsShowModifyModal(true);
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
      key: data.id || '',
      type: getCategoryTypeNameByType(data.type || CategoryTypeEnum.ESTATE),
      image: <CategoryRowImage alt={data.name || ''} src={getImageURLFromImage(data.image, 'thumbnail')} />,
      actions: <CategoryRowAction id={data.id || ''} onEdit={handleClickEdit} onDelete={handleClickDelete} />,
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
      toast.success('Th??nh c??ng!', '???? c???p nh???t th??ng tin danh m???c');
    } else {
      toast.success('Th??nh c??ng!', '???? th??m m???i danh m???c');
    }
    setIsShowModifyModal(false);
    getCategoryList();
  };

  const handleConfirmDeleteCategory = () => {
    if (!selectedCategory) {
      return;
    }
    categoryService
      .deleteCategoryById(selectedCategory.id || '')
      .then(() => {
        toast.success('Th??nh c??ng!', '???? x??a danh m???c');
        getCategoryList();
        setSelectedCategory(null);
      })
      .catch((error: AxiosErrorType) => {
        toast.error('???? x???y ra l???i khi x??a danh m???c!', error.response?.data.message);
      })
      .finally(() => {
        setIsShowDeleteModal(false);
      });
  };

  const handleModifyCategoryFailed = (error: string) => {
    if (selectedCategory) {
      toast.error('???? x???y ra l???i khi c???p nh???t danh m???c!', error);
      return;
    }
    toast.error('???? x???y ra l???i khi th??m danh m???c!', error);
  };

  const handleCloseModifyModal = () => {
    setIsShowModifyModal(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Qu???n l?? danh m???c</div>
        <div>
          <Button colorScheme="teal" onClick={() => setIsShowModifyModal(true)}>
            <Add className="mr-2" />
            Th??m danh m???c
          </Button>
        </div>
      </ContentWrapperHeader>
      <ContentWrapperBody>
        <Table columns={columns} dataSource={formatDataSource(categoryList)} isLoading={isLoading} />
      </ContentWrapperBody>
      <CategoryModifyModal
        isOpen={isShowModifyModal}
        category={selectedCategory}
        onClose={handleCloseModifyModal}
        onFinish={handleFinishModifyCategory}
        onFailed={handleModifyCategoryFailed}
      />
      <DeleteConfirmationModal
        title="X??a danh m???c"
        description={<CategoryDeleteConfirmationModalDescription category={selectedCategory} />}
        isOpen={isShowDeleteModal}
        onSubmit={handleConfirmDeleteCategory}
        onClose={() => setIsShowDeleteModal(false)}
      />
    </ContentWrapper>
  );
};

export default Category;
