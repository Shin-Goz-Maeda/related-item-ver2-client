import React, { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { AuthValue } from "../types/authProviderValue";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthValue>({} as AuthValue);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null | undefined>();
  const [signInCheck, setSignInCheck] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // 現在ログインしているユーザー情報を取得
  useEffect(() => {
    if (!signInCheck) {
      setLoading(false);
      onAuthStateChanged(auth, (user) => {
        setLoading(true);
        setUser(user);
      });
    }
  }, []);

  // ログイン状態とログインしているユーザー情報
  // TODO: anyを解消する。
  const userLoggedInState = (
    signInState: boolean,
    userState: User | null
  ): void => {
    setSignInCheck(signInState);
    setUser(userState);
  };

  // 共有する値
  const value: AuthValue = {
    user,
    userLoggedInState,
  };

  const contents = (
    <AuthContext.Provider value={value}>
      {loading && children}
    </AuthContext.Provider>
  );

  return contents;
};

export default AuthProvider;
