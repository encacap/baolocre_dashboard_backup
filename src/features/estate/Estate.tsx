import { Button } from '@chakra-ui/react';
import { Add } from 'iconsax-react';
import ContentWrapper from '../../common/layout/components/content/ContentWrapper';
import ContentWrapperBody from '../../common/layout/components/content/ContentWrapperBody';
import ContentWrapperHeader from '../../common/layout/components/content/ContentWrapperHeader';

const Estate = () => {
  return (
    <ContentWrapper>
      <ContentWrapperHeader>
        <div>Quản lý bài viết</div>
        <div>
          <Button colorScheme="teal">
            <Add className="mr-2" />
            Thêm bài viết
          </Button>
        </div>
      </ContentWrapperHeader>
      <ContentWrapperBody>Quản lý bài viết</ContentWrapperBody>
    </ContentWrapper>
  );
};

export default Estate;
