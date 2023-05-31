// JSONの型指定をするファイル
export type JSONType = {
  [key: number]: {
    brand: string;
    id: number;
    item_category: string;
    item_img_url: string;
    item_name: string;
    instagram_embed_code?: string;
    item_url?: string;
    item_info?: string;
  };
};
