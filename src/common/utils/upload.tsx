import { FileType } from '../../app/types/common';
import { ImageDataType, ImageVariantDataType } from '../../app/types/upload';

const getImageURLFromFile = (file: FileType) => {
  if (!file) {
    return '';
  }
  if (file.response) {
    return file.response;
  }
  return URL.createObjectURL(file as File);
};

const getVariantObjectFromImage = (image: ImageDataType) => {
  const { variants } = image;
  if (!variants) {
    return {};
  }
  const results: ImageVariantDataType = {};
  variants.forEach((variant) => {
    const variantName = variant.split('/').pop();
    if (!variantName) {
      return;
    }
    results[variantName] = variant;
  });
  return results;
};

const getImageURLFromImage = (image: ImageDataType, variantName: string) => {
  const variantObject = getVariantObjectFromImage(image);
  return variantObject[variantName] || variantObject.public || Object.values(variantObject)[0];
};

export { getImageURLFromFile, getImageURLFromImage };
