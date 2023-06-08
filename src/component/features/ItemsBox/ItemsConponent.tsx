// メインページに各商品の情報を表示するコンポーネント
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import ItemImgContainer from './ItemsImgContainer';
import ItemInfoContainer from './ItemsInfoContainer';
import NothingItemComponent from '../NothingItemComponent';

type Props = {
  itemData: any;
};

const ItemComponent = ({ itemData }: Props): ReactElement => {
  const contents = () => {
    if (itemData) {
      return (
        <Link to={`itemPage/${itemData.id}`}>
          <div className="w-1/4">
            <ItemImgContainer itemImg={itemData.item_img_url} />
            <ItemInfoContainer
              itemName={itemData.item_name}
              itemBrand={itemData.brand}
              itemCategory={itemData.item_category}
            />
          </div>
        </Link>
      );
    } else {
      return <NothingItemComponent />;
    }
  };
  return contents();
};

export default ItemComponent;
