export const CLIENT_DOMAIN: string | undefined = import.meta.env
  .VITE_CLIENT_DOMAIN;

export const SERVER_DOMAIN: string | undefined = import.meta.env
  .VITE_SERVER_DOMAIN;

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
    case "not-mail-varified":
      const notEMailVarified = "メール認証が完了していません。";
      return notEMailVarified;

    // デフォルトエラー
    default:
      const somethingWrong = "メールアドレスかパスワードに誤りがあります。";
      return somethingWrong;
  }
};

// 今日の日付
const date: Date = new Date(Date.now());
const year = date.getFullYear();
const month = ("00" + (date.getMonth() + 1)).slice(-2);
const day = ("00" + date.getDate()).slice(-2);
export const TODAY: string = "" + year + month + day;
