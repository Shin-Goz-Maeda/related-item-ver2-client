import React, { useRef, useState } from "react";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
  UserCredential,
  getAdditionalUserInfo,
} from "firebase/auth";
import { CATCH_ERROR, CLIENT_DOMAIN } from "../../constants";
import { auth, googleProvider } from "../../firebase";
import { postDataToServer } from "../../component/atoms/PostDataToServer";
import { NewUserData } from "../../types/newUserData";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<Object[] | undefined>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleEmailSignUP = () => {
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
        createUserWithEmailAndPassword(auth, email, password)
          .then((result: UserCredential) => {
            const user: User = result.user;

            if (user !== null) {
              const providerId: string | null = result.providerId;
              const email: string | null = result.user.email;
              const emailVerified: boolean = result.user.emailVerified;
              const userId: string = result.user.uid;
              const newUserData: NewUserData = {
                providerId,
                email,
                emailVerified,
                userId,
              };

              postDataToServer("/email-signUp", newUserData, setError);

              const actionCodeSettings = {
                url: CLIENT_DOMAIN + "/signInPage",
                handleCodeInApp: false,
              };

              // TODO: 認証メールを送信する処理を作成する
              if (auth.currentUser) {
                sendEmailVerification(auth.currentUser, actionCodeSettings);
              }

              navigate("/sendMailConfirmationPage");
            } else {
              setError("ユーザーが作成されませんでした。");
            }
          })
          // TODO: any型を修正
          .catch((error: any) => {
            setError(CATCH_ERROR(error.code));
          });
      }
    }
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((result: UserCredential) => {
        const user: User = result.user;

        if (user !== null) {
          const userId: string = result.user.uid;

          postDataToServer("/user-check", userId, setError, setSuccess);

          if (success) {
            // TODO: アカウントが重複して登録される
            // TODO: ”popup.ts:285 Cross-Origin-Opener-Policy policy would block the window.closed call.”が表示され、初回ログインユーザーがアカウント情報登録ページに遷移しない
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
          setError("ユーザーが作成されませんでした。");
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
      <form onSubmit={handleEmailSignUP}>
        <input type="email" placeholder="mail-address" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button>登録</button>
      </form>
      <button onClick={handleGoogleSignUp}>Google認証</button>
    </div>
  );
  return contents;
};

export default SignUpPage;
