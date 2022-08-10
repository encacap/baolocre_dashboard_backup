import { ArrowRight2 } from 'iconsax-react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../../hooks/useSelector';

const HeaderBreadcrumb = () => {
  const { breadcrumbs } = useSelector((state) => state.layout);

  return (
    <div className="flex rounded-full bg-gray-100 px-4 py-1.5 text-sm">
      {breadcrumbs.map((breadcrumb, index) => (
        <div
          className={twMerge(
            'flex items-center hover:text-black',
            index !== breadcrumbs.length - 1 && 'text-gray-500',
          )}
          key={breadcrumb.key}
        >
          <Link to={breadcrumb.path}>{breadcrumb.label}</Link>
          {index !== breadcrumbs.length - 1 && <ArrowRight2 size={14} className="mx-2 text-gray-500" />}
        </div>
      ))}
    </div>
  );
};

export default HeaderBreadcrumb;
