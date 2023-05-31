// アイテムページに表示するアイテム情報の型
export type ItemType = {
  id: number;
  brand: string;
  item_category: string;
  item_img_url: string;
  item_name: string;
  instagram_embed_code?: string;
  item_url?: string;
};
