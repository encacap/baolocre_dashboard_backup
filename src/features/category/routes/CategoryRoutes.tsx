import { Route, Routes } from 'react-router-dom';
import Category from '../Category';

const CategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Category />} />
    </Routes>
  );
};

export default CategoryRoutes;
