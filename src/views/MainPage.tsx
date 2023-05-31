// DBに登録されている商品情報をすべて表示させるページ
import React, { useEffect, useState } from 'react';
import type { JSONType } from '../types/json';
import type { ItemType } from '../types/item';
import { getDatafromServer } from '../component/atoms/GetDataFromServer';
import ItemComponent from '../component/features/ItemsBox/ItemsConponent';
import LoadingComponent from '../component/features/LoadingComponent';

const MainPage = () => {
  const [items, setItems] = useState<JSONType>({});
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // サーバーからすべての商品データを取得し、setItemImgに代入する処理
    getDatafromServer('/getImgMainPage', setItems, setLoading);
  }, []);

  const allItemsData = () => {
    const itemsData = Object.values(items).map(
      (item: ItemType, index: number) => {
        return <ItemComponent key={index} itemData={item} />;
      }
    );
    return itemsData;
  };

  const contents = (
    <div className="w-full">
      <div className="flex">
        {loading ? allItemsData() : <LoadingComponent />}
      </div>
    </div>
  );
  return contents;
};

export default MainPage;
