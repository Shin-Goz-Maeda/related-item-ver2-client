// DBに登録されている商品情報をすべて表示させるページ

import React, { useEffect, useState } from 'react';
import { getDatafromServer } from '../component/atoms/GetDataFromServer';
import type { JSONType } from '../types/json';

const MainPage = () => {
  const [itemImg, setItemImg] = useState<JSONType>({});
  useEffect(() => {
    getDatafromServer('/getImgMainPage', setItemImg);
  }, []);
  console.log(itemImg);
  return <div></div>;
};

export default MainPage;
