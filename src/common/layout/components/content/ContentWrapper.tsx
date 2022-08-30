import _ from 'lodash';
import { useEffect } from 'react';
import { setBreadcrumbs } from '../../../../app/slices/layoutSlice';
import { BreadcrumbType } from '../../../../app/types/common';
import useDispatch from '../../../hooks/useDispatch';

interface ContentWrapperProps {
  breadcrumbs?: BreadcrumbType[];
  children: React.ReactNode | React.ReactNode[];
}

const ContentWrapper = ({ breadcrumbs, children }: ContentWrapperProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!_.isEmpty(breadcrumbs) && breadcrumbs) {
      dispatch(setBreadcrumbs(breadcrumbs));
    } else {
      dispatch(setBreadcrumbs([]));
    }
  }, [breadcrumbs]);

  return <div className="h-full">{children}</div>;
};

export default ContentWrapper;
