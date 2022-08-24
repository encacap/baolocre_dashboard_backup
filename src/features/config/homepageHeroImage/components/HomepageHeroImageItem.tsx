import { Trash } from 'iconsax-react';
import { ImageDataType } from '../../../../app/types/upload';

interface HomepageHeroImageItemProps {
  image: ImageDataType;
}

const HomepageHeroImageItem = ({ image }: HomepageHeroImageItemProps) => {
  return (
    <div
      key={image.id}
      className="group aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed border-gray-200 p-2 duration-100 hover:border-gray-300"
    >
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <img
          src={image.variants[0]}
          alt={image.filename}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60 opacity-0 duration-100 group-hover:opacity-100">
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white text-white duration-100 hover:bg-white hover:bg-opacity-20">
            <Trash size="18" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHeroImageItem;
