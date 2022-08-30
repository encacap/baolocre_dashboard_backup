import { Route, Routes } from 'react-router-dom';
import Estate from '../Estate';

const EstateRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Estate />} />
      <Route path="create" element="Create Estate" />
    </Routes>
  );
};

export default EstateRoutes;
