import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../constants/loginUser";
import { checkAccountRegisterDataToServer } from "../../component/atoms/GetDataFromServer";
import { MailAndProvider } from "../../types/pwResetBefore";
import { auth } from "../../firebase";
import { CLIENT_DOMAIN } from "../../constants";
import { sendPasswordResetEmail } from "firebase/auth";

const PWResetAfterSignInPage = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [accountData, setAccountData] = useState<MailAndProvider | undefined>();
  const userId = user?.uid;
  console.log(accountData);

  useEffect(() => {
    if (userId) {
      checkAccountRegisterDataToServer(
        "/password-reset-after-signIn",
        userId,
        setError,
        setAccountData
      );
    }
  }, []);

  const onSubmit = () => {
    if (accountData?.success[0].mail_address === "email") {
      const email = accountData?.success[0].mail_address;
      const actionSetting = (url: string) => {
        // パスワード再設定メールからパスワードを再設定後にどこへアクセスするかを指定
        const actionCodeSettings = {
          //パスワード再設定後のリダイレクトURL
          url: CLIENT_DOMAIN + url,
          handleCodeInApp: false,
        };
        return actionCodeSettings;
      };
      sendPasswordResetEmail(auth, email, actionSetting("/signInPage")).then(
        () => {
          setSuccess("パスワード再設定メールを送信しました。");
        }
      );
    }
  };

  const googleSignInUserPwReset = (
    <div>
      <p>ご登録のログイン方法ではパスワードをリセットできません。</p>
    </div>
  );

  const mailSignInUserRwReset = (
    <div>
      <form onSubmit={onSubmit}>
        {success && (
          <p style={{ color: "blue", textAlign: "center", marginBottom: 3 }}>
            {success}
          </p>
        )}
        <p>パスワードをリセットしますか？</p>
        <input>{accountData?.success[0].mail_address}</input>
        <button>パスワードをリセット</button>
      </form>
    </div>
  );

  const contents =
    accountData?.success[0].provider === "email"
      ? mailSignInUserRwReset
      : googleSignInUserPwReset;

  return contents;
};

export default PWResetAfterSignInPage;
