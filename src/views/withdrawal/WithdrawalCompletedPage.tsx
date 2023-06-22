import React from "react";
import { useNavigate } from "react-router-dom";

const withdrawalCompletedPage = () => {
  const navigate = useNavigate();
  const goToSignUpPage = () => {
    navigate("/signUpPage");
  };

  const contents = (
    <div>
      <p>退会が完了しました。</p>
      <p>サインアップ画面へ移動するには、下記ボタンをクリック</p>
      <button onClick={goToSignUpPage}>サインアップ画面へ</button>
    </div>
  );
  return contents;
};

export default withdrawalCompletedPage;
