import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../views/MainPage';
import ItemPage from '../views/ItemPage';

const AppRoutes = () => {
  const contents = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="itemPage">
          <Route path=":id" element={<ItemPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  return contents;
};

export default AppRoutes;
