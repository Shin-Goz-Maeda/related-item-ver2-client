import React, { useRef, useState } from "react";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { CATCH_ERROR } from "../constants";
import { auth, googleProvider } from "../firebase";
import { postInfoToServer } from "../component/atoms/PostInfoToServer";
import { NewUserData } from "../types/newUserData";

const SignUpPage = () => {
  const [error, setError] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
          // TODO: any型を修正
          .then((result: any) => {
            console.log(result);
            const providerId: string | null = result.providerId;
            const email: string = result.user.email;
            const emailVerified: boolean = result.user.emailVerified;
            const userId: string = result.user.uid;
            const newUserData: NewUserData = {
              providerId,
              email,
              emailVerified,
              userId,
            };
            postInfoToServer("/email-signUp", newUserData, setError);
          })
          // TODO: any型を修正
          .catch((error: any) => {
            console.log(error);
          });
      }
    }
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      // TODO: any型を修正
      .then((result: any) => {
        console.log(result);
      })
      // TODO: any型を修正
      .catch((error: any) => {
        console.log(error);
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
