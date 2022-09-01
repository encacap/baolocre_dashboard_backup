import { twMerge } from 'tailwind-merge';

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = ({ className }: LoadingSkeletonProps) => {
  return <div className={twMerge('col-span-2 h-2 animate-pulse rounded bg-slate-200', className)} />;
};

export default LoadingSkeleton;
