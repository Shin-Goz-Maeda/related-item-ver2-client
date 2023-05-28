import { HOST_DOMAIN } from '../../constants/Constants';
import type { JSONType } from '../../types/json';

export const getDatafromServer = (
  path: string,
  someSetFunc: React.Dispatch<React.SetStateAction<JSONType>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (HOST_DOMAIN !== undefined) {
    const getData = () => setLoading(false);
    fetch(HOST_DOMAIN + path)
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
