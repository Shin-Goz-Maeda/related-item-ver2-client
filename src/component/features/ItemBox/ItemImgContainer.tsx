import React, { ReactElement } from 'react';

type Props = {
  itemImg: string;
};

const ItemImgContainer = ({ itemImg }: Props): ReactElement => {
  const contents = <img src={itemImg} />;
  return contents;
};

export default ItemImgContainer;
