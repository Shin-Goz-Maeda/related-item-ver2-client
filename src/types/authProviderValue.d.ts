import { User } from "firebase/auth";

export type AuthValue = {
  user: User | null | undefined;
  userLoggedInState: (signInState: boolean, userState: User | null) => void;
};
