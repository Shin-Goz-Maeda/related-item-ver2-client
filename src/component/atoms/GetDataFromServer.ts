import { HOST_DOMAIN } from '../../constants/Constants';
import type { JSONType } from '../../types/json';

export const getDatafromServer = (
  path: string,
  itemSetFunc: React.Dispatch<React.SetStateAction<JSONType>>
) => {
  if (HOST_DOMAIN !== undefined) {
    const getData = () =>
      fetch(HOST_DOMAIN + path)
        .then((res) => {
          res.json().then((data) => {
            itemSetFunc(data);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    return getData();
  }
};
