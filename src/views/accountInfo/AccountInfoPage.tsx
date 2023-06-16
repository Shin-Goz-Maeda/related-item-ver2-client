import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../constants/loginUser";
import { AccountData } from "../../types/postAccountData";
import { getAccountDataToServer } from "../../component/atoms/GetDataFromServer";
import LoadingComponent from "../../component/features/LoadingComponent";
import HeaderComponent from "../../component/features/header/Header";
import { useNavigate } from "react-router-dom";

const AccountInfoPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [accountData, setAccountData] = useState<AccountData | undefined>();

  const userId: string | undefined = user?.uid;
  const userName = accountData?.success[0].user_name;
  const sex = accountData?.success[0].sex;
  const birthDay = accountData?.success[0].birth_date;
  const recommendItems = accountData?.success[0].want_to_item;

  useEffect(() => {
    if (userId) {
      getAccountDataToServer(
        "/account-info",
        userId,
        setLoading,
        setError,
        setAccountData
      );
    }
  }, []);

  const recommendItemsCategory = (itemCategory: string) => {
    if (recommendItems) {
      const itemLength = recommendItems.length;
      const recommendItemData = recommendItems;
      for (let i = 0; itemLength >= i; i++) {
        if (recommendItemData[i] === itemCategory) {
          return true;
        }
      }
    }
  };

  const onSubmit = () => {
    navigate("/accountSetUpPage");
  };

  const accountSetUpForm = (
    <>
      <HeaderComponent />
      <div>
        <h1>アカウント登録</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="userName">ユーザー名</label>
            <input
              id="userName"
              type="text"
              placeholder="userName123"
              defaultValue={userName ? userName : ""}
              disabled
            />
          </div>
          <div>
            <label htmlFor="sex">性別</label>
            <label>男</label>
            <input
              id="sex"
              type="radio"
              value="male"
              defaultChecked={sex === "male"}
              disabled
            />
            <label>女</label>
            <input
              id="sex"
              type="radio"
              value="female"
              defaultChecked={sex === "female"}
              disabled
            />
            <label>その他</label>
            <input
              id="sex"
              type="radio"
              value="other"
              defaultChecked={sex === "other"}
              disabled
            />
          </div>
          <div>
            <label htmlFor="birthDay">誕生日</label>
            {error && (
              <p style={{ color: "red", textAlign: "center", marginBottom: 3 }}>
                {error}
              </p>
            )}
            <input
              id="birthDay"
              type="date-local"
              placeholder="20201010"
              defaultValue={birthDay ? birthDay : ""}
              disabled
            />
          </div>
          <div>
            <label htmlFor="category">
              好きなカテゴリーを選択してください。
            </label>
            <div>
              <label htmlFor="food-drink">グルメ・飲料</label>
              <input
                id="food-drink"
                type="checkbox"
                value="food-drink"
                defaultChecked={
                  recommendItems ? recommendItemsCategory("food-drink") : false
                }
                disabled
              />
            </div>
            <div>
              <label htmlFor="fashion">ファッション</label>
              <input
                id="fashion"
                type="checkbox"
                value="fashion"
                defaultChecked={
                  recommendItems ? recommendItemsCategory("fashion") : false
                }
                disabled
              />
            </div>
            <div>
              <label htmlFor="dailyNecessities">日用品</label>
              <input
                id="dailyNecessities"
                type="checkbox"
                value="dailyNecessities"
                defaultChecked={
                  recommendItems
                    ? recommendItemsCategory("dailyNecessities")
                    : false
                }
                disabled
              />
            </div>
            <div>
              <label htmlFor="cosmetics">コスメ</label>
              <input
                id="cosmetics"
                type="checkbox"
                value="cosmetics"
                defaultChecked={
                  recommendItems ? recommendItemsCategory("cosmetics") : false
                }
                disabled
              />
            </div>
            <div>
              <label htmlFor="baby-kids">ベビー・キッズ</label>
              <input
                id="baby-kids"
                type="checkbox"
                value="baby-kids"
                defaultChecked={
                  recommendItems ? recommendItemsCategory("baby-kids") : false
                }
                disabled
              />
            </div>
            <div>
              <label htmlFor="electronics">家電</label>
              <input
                id="electronics"
                type="checkbox"
                value="electronics"
                defaultChecked={
                  recommendItems ? recommendItemsCategory("electronics") : false
                }
                disabled
              />
            </div>
            <div>
              <label htmlFor="sports">スポーツ</label>
              <input
                id="sports"
                type="checkbox"
                value="sports"
                defaultChecked={
                  recommendItems ? recommendItemsCategory("sports") : false
                }
                disabled
              />
            </div>
          </div>
          <button type="submit">編集</button>
        </form>
      </div>
    </>
  );

  const contents = loading ? accountSetUpForm : <LoadingComponent />;

  return contents;
};

export default AccountInfoPage;
