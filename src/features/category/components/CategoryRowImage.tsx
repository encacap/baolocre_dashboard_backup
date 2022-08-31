interface CategoryRowImageProps {
  src: string;
  alt: string;
}

const CategoryRowImage = ({ src, alt }: CategoryRowImageProps) => {
  return (
    <div className="h-10 w-10 rounded-full border-2 border-gray-100 bg-gray-100">
      <img src={src} alt={alt} className="h-full w-full rounded-full object-cover object-center" />
    </div>
  );
};

export default CategoryRowImage;
