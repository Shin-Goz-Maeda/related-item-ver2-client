// ItemContainer.tsxに商品の画像を表示するコンポーント
import React, { ReactElement } from 'react';

type Props = {
  itemImg: string;
};

const ItemImgContainer = ({ itemImg }: Props): ReactElement => {
  const contents = (
    <>
      <img src={itemImg} alt="itemImg" />
    </>
  );

  return contents;
};

export default ItemImgContainer;
