import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../views/MainPage';
import ItemPage from '../views/ItemPage';
import SignUpPage from '../views/SignUpPage';
import SignInPage from '../views/SignInPage';
import SendMailConfirmationPage from '../views/SendMailConfirmationPage';
import AccountSetUpPage from '../views/accountSetUpPage';

const AppRoutes = () => {
  const contents = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="itemPage">
          <Route path=":id" element={<ItemPage />} />
        </Route>
        <Route path="signUpPage" element={<SignUpPage />} />
        <Route path="signInPage" element={<SignInPage />} />
        <Route
          path="sendMailConfirmationPage"
          element={<SendMailConfirmationPage />}
        />
        <Route path="accountSetUpPage" element={<AccountSetUpPage />} />
      </Routes>
    </BrowserRouter>
  );

  return contents;
};

export default AppRoutes;
