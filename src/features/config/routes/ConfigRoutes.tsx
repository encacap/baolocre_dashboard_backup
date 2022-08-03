import { Route, Routes } from 'react-router-dom';
import Layout from '../../../common/components/layout/Layout';
import Config from '../Config';

const ConfigRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Config />} />
      </Routes>
    </Layout>
  );
};

export default ConfigRoutes;
