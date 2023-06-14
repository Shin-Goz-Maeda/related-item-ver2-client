// DBに登録されている商品情報をすべて表示させるページ
import React, { useEffect, useState } from "react";
import type { JSONType } from "../types/json";
import { getDataFromServer } from "../component/atoms/GetDataFromServer";
import ItemComponent from "../component/features/itemsBox/ItemsConponent";
import LoadingComponent from "../component/features/LoadingComponent";
import HeaderComponent from "../component/features/header/Header";

const MainPage = () => {
  const [items, setItems] = useState<JSONType | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    // サーバーからすべての商品データを取得し、setItemImgに代入する処理
    getDataFromServer("/getImgMainPage", setItems, setLoading);
  }, []);

  const allItemsData = () => {
    if (items) {
      /* TODO: itemのany型を修正する*/
      const itemsData = Object.values(items).map((item: any, index: number) => {
        return <ItemComponent key={index} itemData={item} />;
      });
      return itemsData;
    }
  };

  const contents = (
    <>
      <HeaderComponent />
      <div className="w-full">
        <div className="flex">
          {loading ? allItemsData() : <LoadingComponent />}
        </div>
      </div>
    </>
  );
  return contents;
};

export default MainPage;
