import { HOST_DOMAIN } from '../../constants';

const postInfo = (email: string, password: string) => {
  // POST情報を設定
  const postParameter = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  return postParameter;
};

export const postLoginInfoToServer = (
  path: string,
  email: string,
  password: string
) => {
  fetch(HOST_DOMAIN + path, postInfo(email, password)).then((res) =>
    res.json().then((data) => {
      console.log(data);
    })
  );
};
