import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "../constants/loginUser";
import PrivateRoute from "./PrivateRoute";

import MainPage from "../views/MainPage";
import ItemPage from "../views/ItemPage";
import SignUpPage from "../views/signUp/SignUpPage";
import SignInPage from "../views/SignInPage";
import SendMailConfirmationPage from "../views/signUp/SendMailConfirmationPage";
import AccountSetUpPage from "../views/accountInfo/AccountSetUpPage";
import AccountInfoPage from "../views/accountInfo/AccountInfoPage";
import PWResetBeforeSignInPage from "../views/passwordReset/PWResetBeforeSignInPage";
import PWResetAfterSignInPage from "../views/passwordReset/PWResetAfterSignInPage";
import WithdrawalPage from "../views/withdrawal/WithdrawalPage";
import WithdrawalCompletedPage from "../views/withdrawal/WithdrawalCompletedPage";

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
          <Route
            path="withDrawalPage"
            element={
              <PrivateRoute>
                <WithdrawalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="withDrawalCompletedPage"
            element={<WithdrawalCompletedPage />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );

  return contents;
};

export default AppRoutes;
