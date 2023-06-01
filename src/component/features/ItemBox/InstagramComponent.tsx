import React, { ReactElement } from 'react';
import NothingItemComponent from '../NothingItemComponent';

type Props = {
  instagramData: any;
};

const InstagramComponent = ({ instagramData }: Props): ReactElement => {
  const contents = () => {
    const instagramEmbedCode = instagramData?.instagram_embed_code;
    if (instagramEmbedCode) {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: instagramEmbedCode,
          }}
        ></div>
      );
    } else {
      return <NothingItemComponent />;
    }
  };
  return contents();
};

export default InstagramComponent;
