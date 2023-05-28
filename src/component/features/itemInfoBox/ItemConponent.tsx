// メインページに各商品の情報を表示するコンポーネント
import React, { ReactElement } from 'react';
import type { ItemType } from '../../../types/item';
import ItemImgContainer from './ItemImgContainer';
import ItemInfoContainer from './ItemInfoContainer';

type Props = {
  itemData: ItemType;
};

const ItemComponent = ({ itemData }: Props): ReactElement => {
  console.log(itemData);

  const contents = (
    <div className="w-1/4">
      <ItemImgContainer img={itemData.item_img_url} />
      <ItemInfoContainer
        itemName={itemData.item_name}
        itemBrand={itemData.brand}
        itemCategory={itemData.item_category}
      />
    </div>
  );
  return contents;
};

export default ItemComponent;
