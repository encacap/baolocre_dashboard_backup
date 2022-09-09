import { Route, Routes } from 'react-router-dom';
import Contact from '../Contact';

const ContactRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Contact />} />
    </Routes>
  );
};

export default ContactRoutes;
