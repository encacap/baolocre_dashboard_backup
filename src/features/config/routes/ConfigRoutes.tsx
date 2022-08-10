import { Route, Routes } from 'react-router-dom';
import Config from '../Config';
import ContactInformation from '../ContactInformation';

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Config />} />
      <Route path="/contact-information" element={<ContactInformation />} />
    </Routes>
  );
};

export default ConfigRoutes;
