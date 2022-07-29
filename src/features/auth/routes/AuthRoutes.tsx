import { Route, Routes } from 'react-router-dom';
import Login from '../login/Login';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AuthRoutes;
