import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MailAndProvider } from "../../types/pwResetBefore";
import { checkAccountRegisterDataToServer } from "../../component/atoms/GetDataFromServer";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { CLIENT_DOMAIN } from "../../constants";

const PWResetBeforeSignInPage = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [accountData, setAccountData] = useState<MailAndProvider | undefined>();

  // TODO: anyを解消する
  const onSubmit = async (data: any) => {
    const email: string | undefined = data.email;
    if (email !== undefined) {
      checkAccountRegisterDataToServer(
        "//password-reset-before-signIn",
        email,
        setError,
        setAccountData
      );
      if (accountData?.success[0].provider === "email") {
        // アクションコード
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
      } else {
        setError("入力したメールアドレスはご登録されていません。");
      }
    } else {
      setError("メールアドレスを入力してください。");
    }
  };

  const contents = (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* TODO: エラとサクセスメッセージが同時に表示される問題 */}
          {success && (
            <p style={{ color: "blue", textAlign: "center", marginBottom: 3 }}>
              {success}
            </p>
          )}
          {error && (
            <p style={{ color: "red", textAlign: "center", marginBottom: 3 }}>
              {error}
            </p>
          )}
          <label>パスワードをリセットしたいメールアドレスを入力</label>
          <input
            id="email"
            placeholder="test@test.com"
            type="text"
            required
            {...register("email")}
          />
          <button>送信</button>
        </form>
      </div>
    </>
  );
  return contents;
};

export default PWResetBeforeSignInPage;
