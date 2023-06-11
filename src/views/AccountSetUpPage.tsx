import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { PostAccountData } from "../types/postAccountData";
import { TODAY } from "../constants";
import { postDataToServer } from "../component/atoms/PostDataToServer";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../constants/loginUser";

const AccountSetUpPage = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  console.log(user);

  const onSubmit = (data: any) => {
    const userId = user?.uid;
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

  const contents = (
    <div>
      <h1>アカウント登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="userName">ユーザー名</label>
          <input
            id="userName"
            type="text"
            placeholder="userName123"
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
            required
            {...register("sex")}
          />
          <label>女</label>
          <input
            id="sex"
            type="radio"
            value="female"
            required
            {...register("sex")}
          />
          <label>その他</label>
          <input
            id="sex"
            type="radio"
            value="other"
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
            required
            {...register("birthDay")}
          />
        </div>
        <div>
          <label htmlFor="category">好きなカテゴリーを選択してください。</label>
          <div>
            <label htmlFor="food-drink">グルメ・飲料</label>
            <input
              id="food-drink"
              type="checkbox"
              value="food-drink"
              {...register("category")}
            />
          </div>
          <div>
            <label htmlFor="fashion">ファッション</label>
            <input
              id="fashion"
              type="checkbox"
              value="fashion"
              {...register("category")}
            />
          </div>
          <div>
            <label htmlFor="dailyNecessities">日用品</label>
            <input
              id="dailyNecessities"
              type="checkbox"
              value="dailyNecessities"
              {...register("category")}
            />
          </div>
          <div>
            <label htmlFor="cosmetics">コスメ</label>
            <input
              id="cosmetics"
              type="checkbox"
              value="cosmetics"
              {...register("category")}
            />
          </div>
          <div>
            <label htmlFor="baby-kids">ベビー・キッズ</label>
            <input
              id="baby-kids"
              type="checkbox"
              value="baby-kids"
              {...register("category")}
            />
          </div>
          <div>
            <label htmlFor="electronics">家電</label>
            <input
              id="electronics"
              type="checkbox"
              value="electronics"
              {...register("category")}
            />
          </div>
          <div>
            <label htmlFor="sports">スポーツ</label>
            <input
              id="sports"
              type="checkbox"
              value="sports"
              {...register("category")}
            />
          </div>
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );

  return contents;
};

export default AccountSetUpPage;
