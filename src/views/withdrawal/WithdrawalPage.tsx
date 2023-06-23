import React, { useContext, useState } from "react";
import { AuthContext } from "../../constants/loginUser";
import { withDrawalAccountDataToServer } from "../../component/atoms/GetDataFromServer";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const withdrawalPage = () => {
  const navigate = useNavigate();
  const { user, userLoggedInState } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const userId = user?.uid;

  console.log(user);

  const onSubmitWithDrawal = () => {
    withDrawalAccountDataToServer("/account-withDrawal", userId, setError);
    if (error === "") {
      userLoggedInState(false, null);
      signOut(auth);
      navigate("/signUpPage");
    }
  };

  const contents = (
    <div>
      <p>サービスから退会する場合は、下記のボタンをクリックしてください。</p>
      <button onClick={onSubmitWithDrawal}>退会</button>
    </div>
  );
  return contents;
};

export default withdrawalPage;
