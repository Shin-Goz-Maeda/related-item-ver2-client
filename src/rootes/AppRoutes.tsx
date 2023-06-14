import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "../constants/loginUser";
import PrivateRoute from "./PrivateRoute";

import MainPage from "../views/MainPage";
import ItemPage from "../views/ItemPage";
import SignUpPage from "../views/SignUpPage";
import SignInPage from "../views/SignInPage";
import SendMailConfirmationPage from "../views/SendMailConfirmationPage";
import AccountSetUpPage from "../views/accountSetUpPage";

const AppRoutes = () => {
  const contents = (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="itemPage/:id"
            element={
              <PrivateRoute>
                <ItemPage />
              </PrivateRoute>
            }
          />
          <Route path="signUpPage" element={<SignUpPage />} />
          <Route path="signInPage" element={<SignInPage />} />
          <Route
            path="sendMailConfirmationPage"
            element={<SendMailConfirmationPage />}
          />
          <Route
            path="accountSetUpPage"
            element={
              <PrivateRoute>
                <AccountSetUpPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

  return contents;
};

export default AppRoutes;
