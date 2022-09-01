import LoadingSkeleton from '../../../common/components/loading/LoadingSkeleton';

const CategoryRowActionSkeleton = () => {
  return (
    <div className="flex items-center justify-end space-x-3">
      <LoadingSkeleton className="h-7 w-7 rounded-full" />
      <LoadingSkeleton className="h-7 w-7 rounded-full" />
    </div>
  );
};

export default CategoryRowActionSkeleton;
