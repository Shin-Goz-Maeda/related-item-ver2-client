import { User } from "firebase/auth";

export type AuthValue = {
  user: User | null | undefined;
  userLoggedInState: {
    setSignInCheck: (signInState: boolean) => void;
    setUser: (userState: User | null) => void;
  };
};
