import _ from 'lodash';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../../common/components/layout/Layout';
import PrepareOverlay from '../../common/components/loading/PrepareOverlay';
import useDispatch from '../../common/hooks/useDispatch';
import useSelector from '../../common/hooks/useSelector';
import ConfigRoutes from '../../features/config/routes/ConfigRoutes';
import { AUTHENTICATION_PATH } from '../constants/URL';
import { userService } from '../services';
import { setUser } from '../slices/userSlice';

const ProtectedRoutes = () => {
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isGetting, setIsGetting] = useState(true);

  const setIsGettingDebounced = useCallback(_.debounce(setIsGetting, 500), []);

  useLayoutEffect(() => {
    if (currentUser?.id) {
      setIsGetting(false);
      return;
    }

    const ignorePath = [AUTHENTICATION_PATH.LOGIN_PATH];
    const isMatchIgnorePath = ignorePath.some((path) => window.location.pathname.includes(path));

    if (isMatchIgnorePath) {
      setIsGetting(false);
      return;
    }

    userService
      .getMe()
      .then((response) => {
        setIsGettingDebounced(false);
        const userData = response.data.data;
        dispatch(setUser(userData));
      })
      .catch((error) => {
        const currentURL = window.encodeURIComponent(window.location.href);
        window.location.href = `${AUTHENTICATION_PATH.LOGIN_PATH}?from=${currentURL}&error=${error.response.status}`;
      });
  }, [currentUser]);

  return (
    <>
      {isGetting && <PrepareOverlay />}
      {!isGetting && (
        <Layout>
          <Routes>
            <Route path="/" element="Home" />
            <Route path="configs/*" element={<ConfigRoutes />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default ProtectedRoutes;
