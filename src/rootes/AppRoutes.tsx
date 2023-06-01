import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../views/MainPage';
import ItemPage from '../views/ItemPage';
import SignUpPage from '../views/SignUpPage';

const AppRoutes = () => {
  const contents = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="itemPage">
          <Route path=":id" element={<ItemPage />} />
        </Route>
        <Route path="signUpPage" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  );

  return contents;
};

export default AppRoutes;
