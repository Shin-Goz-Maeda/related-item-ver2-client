import React, { ReactElement } from 'react';

type Props = {
  itemName: string;
  itemBrand: string;
  itemCategory: string;
  itemUrl?: string;
  itemInfo?: string;
};

const ItemInfoContainer = ({
  itemName,
  itemBrand,
  itemCategory,
  itemUrl,
  itemInfo,
}: Props): ReactElement => {
  const contents = (
    <>
      <div>{itemName}</div>
      <div>{itemBrand}</div>
      <div>{itemCategory}</div>
      <div>{itemUrl}</div>
      <div>{itemInfo}</div>
    </>
  );
  return contents;
};

export default ItemInfoContainer;
