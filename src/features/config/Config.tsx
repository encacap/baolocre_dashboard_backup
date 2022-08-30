import ContentWrapper from '../../common/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../common/layout/components/content/ContentWrapperBody';
import ContentWrapperHeader from '../../common/layout/components/content/ContentWrapperHeader';
import ContactInformation from './ContactInformation';
import HomepageHeroImage from './homepageHeroImage/HomepageHeroImage';
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
          <HomepageHeroImage />
        </div>
      </ContentWrapperBody>
    </ContentWrapper>
  );
};

export default Config;
