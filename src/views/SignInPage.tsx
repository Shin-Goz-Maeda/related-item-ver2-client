import React, { useRef, useState } from "react";
import { CATCH_ERROR } from "../constants";
import { auth, googleProvider } from "../firebase";
import {
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserCredential,
} from "firebase/auth";
import { postDataToServer } from "../component/atoms/PostDataToServer";
import { UserData } from "../types/userData";
import { useNavigate } from "react-router-dom";
import { NewUserData } from "../types/newUserData";

const SignInPage = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<Object[] | undefined>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleEmailSignIn = () => {
    event?.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (!email && password) {
      setError(CATCH_ERROR("not-emailValue"));
    } else if (!password && email) {
      setError(CATCH_ERROR("not-passwordValue"));
    } else if (!email && !password) {
      setError(CATCH_ERROR("not-bothValue"));
    } else {
      if (email && password) {
        signInWithEmailAndPassword(auth, email, password)
          .then((result: UserCredential) => {
            const user: User = result.user;
            if (user !== null) {
              const userId: string = result.user.uid;
              const emailVerified: boolean = result.user.emailVerified;
              const userData: UserData = {
                userId,
                emailVerified,
              };
              postDataToServer("/email-signIn", userData, setError, setSuccess);

              if (success) {
                navigate("/accountSetUpPage");
              }
            } else {
              setError("ログインできませんでした。");
            }
          })
          // TODO: any型を修正
          .catch((error: any) => {
            setError(CATCH_ERROR(error.code));
          });
      }
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result: UserCredential) => {
        const user: User = result.user;

        if (user !== null) {
          const userId: string = result.user.uid;

          postDataToServer("/user-check", userId, setError, setSuccess);
          console.log(success);

          if (success) {
            if (Object.keys(success).length > 1) {
              navigate("/");
            } else {
              const providerId: string | null = result.providerId;
              const email: string | null = result.user.email;
              const emailVerified: boolean = result.user.emailVerified;
              const newUserData: NewUserData = {
                providerId,
                email,
                emailVerified,
                userId,
              };

              postDataToServer("/google-signUp", newUserData, setError);

              // 初回ログインユーザーか判断
              const isNewUser: boolean | undefined =
                getAdditionalUserInfo(result)?.isNewUser;

              if (isNewUser) {
                navigate("/accountSetUpPage");
              } else {
                navigate("/");
              }
            }
          }
        } else {
          setError("ログインできませんでした。");
        }
      })
      // TODO: any型を修正
      .catch((error: any) => {
        setError(CATCH_ERROR(error.code));
      });
  };

  const contents = (
    <div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleEmailSignIn}>
        <input type="email" placeholder="mail-address" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button>ログイン</button>
      </form>
      <button onClick={handleGoogleSignIn}>Google認証</button>
    </div>
  );
  return contents;
};

export default SignInPage;
