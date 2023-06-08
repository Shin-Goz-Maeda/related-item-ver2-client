import React from "react";

const SendMailConfirmationPage = () => {
  const contents = (
    <div>
      <p>登録頂いたメールアドレスへ認証メールを送信しました。</p>
      <p>メールに記載のリンクをクリックしてメール認証を行ってください。</p>
    </div>
  );
  return contents;
};

export default SendMailConfirmationPage;
