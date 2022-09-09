import ContentWrapper from '../../../common/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../../common/layout/components/content/ContentWrapperBody';
import ContentWrapperBodyTitle from '../../../common/layout/components/content/ContentWrapperBodyTitle';
import ContentWrapperHeader from '../../../common/layout/components/content/ContentWrapperHeader';
import EstateForm from '../components/EstateForm';

const CreateEstate = () => {
  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Thêm bài viết mới</div>
      </ContentWrapperHeader>
      <ContentWrapperBody>
        <div className="grid grid-cols-12 gap-x-8">
          <div className="col-span-9 border-r-2 border-gray-100">
            <ContentWrapperBodyTitle>Thông tin bài viết</ContentWrapperBodyTitle>
            <EstateForm className="mt-2" />
          </div>
          <div className="col-span-3 border-gray-100">
            <ContentWrapperBodyTitle>Danh sách bản nháp</ContentWrapperBodyTitle>
          </div>
        </div>
      </ContentWrapperBody>
    </ContentWrapper>
  );
};

export default CreateEstate;
