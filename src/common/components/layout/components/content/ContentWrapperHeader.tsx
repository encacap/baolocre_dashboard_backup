import { twMerge } from 'tailwind-merge';

interface ContentWrapperHeaderProps {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

const ContentWrapperHeader = ({ className, children }: ContentWrapperHeaderProps) => {
  return (
    <div
      className={twMerge(
        'mx-8 border-b-2 border-gray-100 pt-7 pb-6 text-xl font-semibold text-teal-600',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ContentWrapperHeader;
