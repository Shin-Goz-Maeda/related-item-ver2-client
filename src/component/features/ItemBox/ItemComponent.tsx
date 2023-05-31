import React, { ReactElement } from 'react';
import NothingItemComponent from '../nothingItemComponent';
import ItemImgContainer from './ItemImgContainer';
import ItemInfoContainer from './ItemInfoContainer';
import { JSONType } from '../../../types/json';

type Props = {
  itemData: JSONType | null;
};

const ItemDetailComponent = ({ itemData }: Props): ReactElement => {
  const contents = () => {
    if (itemData) {
      return (
        <>
          <ItemImgContainer itemImg={itemData[0].item_img_url} />
          <ItemInfoContainer
            itemName={itemData[0].item_name}
            itemBrand={itemData[0].brand}
            itemCategory={itemData[0].item_category}
            itemUrl={itemData[0].item_url}
            itemInfo={itemData[0].item_info}
          />
        </>
      );
    } else {
      return <NothingItemComponent />;
    }
  };
  return contents();
};

export default ItemDetailComponent;
