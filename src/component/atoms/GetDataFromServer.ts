import { SERVER_DOMAIN } from "../../constants/index";
import type { JSONType } from "../../types/json";

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
