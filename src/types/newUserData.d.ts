// 新規ユーザーのデータをサーバーに送信する際のデータの型
export type NewUserData = {
  providerId: string | null;
  email: string | null;
  emailVerified: boolean;
  userId: string;
};
