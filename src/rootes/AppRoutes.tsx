import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "../constants/loginUser";
import PrivateRoute from "./PrivateRoute";

import MainPage from "../views/MainPage";
import ItemPage from "../views/ItemPage";
import SignUpPage from "../views/SignUpPage";
import SignInPage from "../views/SignInPage";
import SendMailConfirmationPage from "../views/SendMailConfirmationPage";
import AccountSetUpPage from "../views/accountInfo/AccountSetUpPage";
import AccountInfoPage from "../views/accountInfo/AccountInfoPage";
import PWResetBeforeSignInPage from "../views/PasswordReset/PWResetBeforeSignInPage";
import PWResetAfterSignInPage from "../views/PasswordReset/PWResetAfterSignInPage";

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
          <Route
            path="accountInfoPage"
            element={
              <PrivateRoute>
                <AccountInfoPage />
              </PrivateRoute>
            }
          />
          <Route
            path="pwResetBeforeSignInPage"
            element={<PWResetBeforeSignInPage />}
          />
          <Route
            path="pwResetAfterSignInPage"
            element={
              <PrivateRoute>
                <PWResetAfterSignInPage />
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
