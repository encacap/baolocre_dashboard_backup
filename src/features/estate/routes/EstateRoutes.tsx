import { Route, Routes } from 'react-router-dom';
import CreateEstate from '../create/CreateEstate';
import Estate from '../Estate';

const EstateRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Estate />} />
      <Route path="create" element={<CreateEstate />} />
    </Routes>
  );
};

export default EstateRoutes;
