import { twMerge } from 'tailwind-merge';

interface ContentWrapperHeaderProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const ContentWrapperHeader = ({ className, children }: ContentWrapperHeaderProps) => {
  return (
    <div
      className={twMerge(
        'mx-8 flex h-20 items-center justify-between border-b-2 border-gray-100 text-xl font-semibold text-teal-600',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapperHeader;
