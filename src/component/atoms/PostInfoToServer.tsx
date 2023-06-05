import { CATCH_ERROR, HOST_DOMAIN } from "../../constants";
import { NewUserData } from "../../types/newUserData";

const postInfo = (data: NewUserData) => {
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

export const postInfoToServer = (
  path: string,
  data: NewUserData,
  setErrorFunc: React.Dispatch<React.SetStateAction<string>>
) => {
  fetch(HOST_DOMAIN + path, postInfo(data)).then((res) =>
    res.json().then((data) => {
      if (data.name === "FirebaseError") {
        setErrorFunc(CATCH_ERROR(data.code));
      }
    })
  );
};
