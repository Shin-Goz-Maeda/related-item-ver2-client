import { SERVER_DOMAIN } from "../../constants/index";
import type { JSONType } from "../../types/json";
import { AccountData } from "../../types/postAccountData";
import { MailAndProvider } from "../../types/pwResetBefore";

export const getDataFromServer = (
  path: string,
  someSetFunc: React.Dispatch<React.SetStateAction<JSONType | undefined>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (SERVER_DOMAIN !== undefined) {
    const getData = () => setLoading(false);
    fetch(SERVER_DOMAIN + path)
      .then((res) => {
        res.json().then((data) => {
          someSetFunc(data);
          setLoading(true);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    return getData();
  }
};

const accountData = (data: string) => {
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

export const getAccountDataToServer = (
  path: string,
  data: string,
  setLoadingFunc: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorFunc: React.Dispatch<React.SetStateAction<string>>,
  setSuccessFunc: React.Dispatch<React.SetStateAction<AccountData | undefined>>
) => {
  setLoadingFunc(false);
  fetch(SERVER_DOMAIN + path, accountData(data)).then((res) =>
    res.json().then((data) => {
      if (data.success && setSuccessFunc) {
        setLoadingFunc(true);
        setSuccessFunc(data);
        return;
      }

      if (data.error) {
        setLoadingFunc(true);
        setErrorFunc(data.error);
        return;
      }
    })
  );
};

const accountRegisterData = (data: string) => {
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

export const checkAccountRegisterDataToServer = (
  path: string,
  data: string,
  setErrorFunc: React.Dispatch<React.SetStateAction<string>>,
  setSuccessFunc: React.Dispatch<
    React.SetStateAction<MailAndProvider | undefined>
  >
) => {
  fetch(SERVER_DOMAIN + path, accountRegisterData(data)).then((res) =>
    res.json().then((data) => {
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
