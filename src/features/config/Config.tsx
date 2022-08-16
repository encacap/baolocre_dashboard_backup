import ContentWrapper from '../../common/components/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../common/components/layout/components/content/ContentWrapperBody';
import ContentWrapperHeader from '../../common/components/layout/components/content/ContentWrapperHeader';
import ContactInformation from './ContactInformation';
import SEO from './SEO';

const Config = () => {
  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Cài đặt chung</div>
      </ContentWrapperHeader>
      <ContentWrapperBody>
        <div className="grid gap-y-6">
          <ContactInformation />
          <SEO />
          <div className="border-t-2 border-gray-100 pt-5">
            <div className="text-lg font-semibold text-teal-600">Hình ảnh giới thiệu</div>
            <div className="mt-4 grid gap-y-3">
              <div className="aspect-video w-full rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>
      </ContentWrapperBody>
    </ContentWrapper>
  );
};

export default Config;
