import { CATCH_ERROR, SERVER_DOMAIN } from "../../constants";
import { NewUserData } from "../../types/newUserData";
import { PostData } from "../../types/postAccountData";
import { MailAndProvider } from "../../types/pwResetBefore";
import { UserData } from "../../types/userData";

const postData = (
  data: NewUserData | UserData | string | PostData | MailAndProvider
) => {
  // POST情報を設定
  const postParameter = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data,
    }),
  };
  return postParameter;
};

export const postDataToServer = (
  path: string,
  data: NewUserData | UserData | string | PostData | MailAndProvider,
  setErrorFunc: React.Dispatch<React.SetStateAction<string>>,
  setSuccessFunc?: React.Dispatch<React.SetStateAction<Object[] | undefined>>
) => {
  fetch(SERVER_DOMAIN + path, postData(data)).then((res) =>
    res.json().then((data) => {
      console.log(data);
      if (data.name === "FirebaseError") {
        setErrorFunc(CATCH_ERROR(data.code));
        return;
      }

      if (data.success && setSuccessFunc) {
        setSuccessFunc(data);
        return;
      }

      if (data.error) {
        setErrorFunc(data.error);
        return;
      }
    })
  );
};
