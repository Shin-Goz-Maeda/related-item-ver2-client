// ItemContainer.tsxに商品の画像を表示するコンポーント
import React, { ReactElement } from 'react';

type Props = {
  img: string;
};

const ItemImgContainer = ({ img }: Props): ReactElement => {
  return (
    <>
      <img src={img} alt="itemImg" />
    </>
  );
};

export default ItemImgContainer;
