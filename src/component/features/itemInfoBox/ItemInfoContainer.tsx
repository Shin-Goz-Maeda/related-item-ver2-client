// ItemContainer.tsxに商品の情報を表示するコンポーント
import React, { ReactElement } from 'react';

type Props = {
  itemName: string;
  itemBrand: string;
  itemCategory: string;
};

const ItemInfoContainer = ({
  itemName,
  itemBrand,
  itemCategory,
}: Props): ReactElement => {
  return (
    <>
      <div>{itemName}</div>
      <div>{itemBrand}</div>
      <div>{itemCategory}</div>
    </>
  );
};

export default ItemInfoContainer;
