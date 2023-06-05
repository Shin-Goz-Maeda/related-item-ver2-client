// 新規ユーザーのデータをサーバーに送信する際のデータの型
export type NewUserData = {
  providerId: string | null;
  email: string;
  emailVerified: boolean;
  userId: string;
};
