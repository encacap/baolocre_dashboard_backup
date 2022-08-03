import { Route, Routes } from 'react-router-dom';
import Config from '../Config';

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Config />} />
    </Routes>
  );
};

export default ConfigRoutes;
