export type PostAccountData = {
  userName: string;
  sex: string;
  birthDay: string;
  category?: string;
};

export type PostData = {
  userId: string | undefined;
  accountData: postAccountData;
};

export type AccountData = {
  success: [
    {
      birth_date: number;
      sex: string;
      user_name: string;
      want_to_item: string[];
    }
  ];
};
