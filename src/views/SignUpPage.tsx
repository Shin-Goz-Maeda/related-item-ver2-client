import React, { useRef } from 'react';
import { postLoginInfoToServer } from '../component/atoms/PostLoginInfoToServer';

const SignUpPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    event?.preventDefault();
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if (email && password) {
      postLoginInfoToServer('/signUpConfirmation', email, password);
    }
  };

  const contents = (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="mail-address" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button>登録</button>
      </form>
    </div>
  );
  return contents;
};

export default SignUpPage;
