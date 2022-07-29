import { Route, Routes } from 'react-router-dom';
import AuthRoutes from '../../features/auth/routes/AuthRoutes';

const CommonRoutes = () => {
    return (
        <Routes>
            <Route path="/" element="Home" />
            <Route path="auth/*" element={<AuthRoutes />} />
        </Routes>
    );
};

export default CommonRoutes;
