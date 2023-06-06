export const HOST_DOMAIN: string | undefined = import.meta.env.VITE_HOST_DOMAIN;

export const CATCH_ERROR = (error: string) => {
  switch (error) {
    // firebaee関連のエラー
    case "auth/invalid-email":
      const invalidMail = "正しいメールアドレスの形式で入力してください。";
      return invalidMail;
    case "auth/user-not-found":
      const notFound = "メールアドレスかパスワードに誤りがあります。";
      return notFound;
    case "auth/wrong-password":
      const wrongPass = "メールアドレスかパスワードに誤りがあります。";
      return wrongPass;
    case "auth/too-many-requests":
      const tooManyRequest =
        "パスワードリセットのリクエストが多すぎます。時間をおいて再度お試しください。";
      return tooManyRequest;
    case "auth/weak-password":
      const weakPassword = "パスワードは6文字以上を設定する必要があります。";
      return weakPassword;
    case "auth/email-already-in-use":
      const alreadyUsedEmail = "すでにこのメールアドレスは登録されています。";
      return alreadyUsedEmail;

    // サインアップ＆ログイン時の入力エラー
    case "not-emailValue":
      const notEmailValue = "メールアドレスかパスワードに誤りがあります。";
      return notEmailValue;
    case "not-passwordValue":
      const notPasswordValue = "メールアドレスかパスワードに誤りがあります。";
      return notPasswordValue;
    case "not-bothValue":
      const notBothValue = "メールアドレスかパスワードに誤りがあります。";
      return notBothValue;

    // デフォルトエラー
    default:
      const somethingWrong = "メールアドレスかパスワードに誤りがあります。";
      return somethingWrong;
  }
};
