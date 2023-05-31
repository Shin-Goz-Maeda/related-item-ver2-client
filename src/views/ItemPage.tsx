import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatafromServer } from '../component/atoms/GetDataFromServer';
import { JSONType } from '../types/json';
import LoadingComponent from '../component/features/LoadingComponent';
import ItemComponent from '../component/features/ItemBox/ItemComponent';
import InstagramComponent from '../component/features/ItemBox/InstagramComponent';

// windowにInstgrmのプロパティがないため、持っていることを宣言しエラーを回避している
interface InstagramWindow extends Window {
  instgrm: any;
}

declare const window: InstagramWindow;

const ItemPage = () => {
  const [item, setItem] = useState<JSONType>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    //　idの数値に該当するアイテムの情報を取得する
    getDatafromServer(`/itemPage/${id}`, setItem, setLoading);
  }, [id]);

  useEffect(() => {
    // インスタグラムの埋め込みコードを描画が終わった後に表示する
    // 投稿の描画が終わったらスクリプトを読みこませる。
    if (loading) {
      if (window.instgrm !== undefined) {
        // インスタグラムの埋め込みコードを描画が終わった際に直接メソッドを呼び出すことで埋め込み情報を表示させる。
        window.instgrm.Embeds.process();
      }

      const script = document.createElement('script');
      script.type = 'text/javascript';

      const attr = document.createAttribute('src');
      attr.value = '//www.instagram.com/embed.js';
      script.setAttributeNode(attr);

      const head = document.getElementsByTagName('head')[0];
      head.appendChild(script);
    }
  }, [loading]);

  const itemData = item ? (
    <ItemComponent itemData={item} />
  ) : (
    <ItemComponent itemData={null} />
  );

  const instagramData = () => {
    if (item) {
      if (item[0].instagram_embed_code === null) {
        return <InstagramComponent instagramData={null} />;
      } else {
        // instagramEmbedCodeが複数ある場合、itemのオブジェクトに複数格納されているのでmapでそれぞれを取り出す処理を作成
        const instagramEmbedCodes = Object.values(item).map(
          // TODO: 一時的にitemの型をanyに設定しているので、後に改善する。
          (item: any, index: number) => {
            return <InstagramComponent instagramData={item} key={index} />;
          }
        );
        return instagramEmbedCodes;
      }
    }
  };

  const itemDataOnItemPage = (
    <>
      <div>{itemData}</div>
      <div>{instagramData()}</div>
    </>
  );

  const contents = (
    <div>
      <div>{loading ? itemDataOnItemPage : <LoadingComponent />}</div>
    </div>
  );
  return contents;
};

export default ItemPage;
