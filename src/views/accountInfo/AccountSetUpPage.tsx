import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AccountData, PostAccountData } from "../../types/postAccountData";
import { TODAY } from "../../constants";
import { postDataToServer } from "../../component/atoms/PostDataToServer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../constants/loginUser";
import LoadingComponent from "../../component/features/LoadingComponent";
import { getAccountDataToServer } from "../../component/atoms/GetDataFromServer";
import HeaderComponent from "../../component/features/header/Header";

const AccountSetUpPage = () => {
  const { user } = useContext(AuthContext);
  const [accountData, setAccountData] = useState<AccountData | undefined>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

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

  const onSubmit = (data: any) => {
    const birthDay = data.birthDay;
    const birthDayMonth1 = birthDay.charAt(4);
    const birthDayMonth2 = birthDay.charAt(5);
    const birthDayDate1 = birthDay.charAt(6);
    const birthDayDate2 = birthDay.charAt(7);
    const birthDayMonth = "" + birthDayMonth1 + birthDayMonth2;
    const birthDayDate = "" + birthDayDate1 + birthDayDate2;

    if (
      TODAY >= birthDay &&
      "01" <= birthDayMonth &&
      "12" >= birthDayMonth &&
      "01" <= birthDayDate &&
      "31" >= birthDayDate
    ) {
      const accountData: PostAccountData = {
        userName: data.userName,
        sex: data.sex,
        birthDay,
        category: JSON.stringify(data.category),
      };
      const postData = {
        userId,
        accountData,
      };

      postDataToServer("/account-info-setUp", postData, setError);
      navigate("/");
    } else {
      setError("誕生日が正しく入力されていません。");
    }
  };

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

  const accountSetUpForm = (
    <>
      <HeaderComponent />
      <div>
        <h1>アカウント登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="userName">ユーザー名</label>
            <input
              id="userName"
              type="text"
              placeholder="userName123"
              defaultValue={userName ? userName : ""}
              required
              {...register("userName")}
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
              required
              {...register("sex")}
            />
            <label>女</label>
            <input
              id="sex"
              type="radio"
              value="female"
              defaultChecked={sex === "female"}
              required
              {...register("sex")}
            />
            <label>その他</label>
            <input
              id="sex"
              type="radio"
              value="other"
              defaultChecked={sex === "other"}
              required
              {...register("sex")}
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
              required
              {...register("birthDay")}
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
                {...register("category")}
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
                {...register("category")}
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
                {...register("category")}
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
                {...register("category")}
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
                {...register("category")}
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
                {...register("category")}
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
                {...register("category")}
              />
            </div>
          </div>
          <button type="submit">登録</button>
        </form>
      </div>
    </>
  );

  const contents = loading ? accountSetUpForm : <LoadingComponent />;

  return contents;
};

export default AccountSetUpPage;
