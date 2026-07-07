export type SigninRewardItem = {
  dayNo: number;
  bonusAmount: number;
  expireDays: number;
  rewardDesc: string;
};

export type SigninSettings = {
  enabled: 0 | 1;
  cycleDays: number;
  remark: string;
  updatedAt: number;
  items: SigninRewardItem[];
};

const cloneSettings = (settings: SigninSettings): SigninSettings => ({
  ...settings,
  items: settings.items.map((item) => ({ ...item })),
});

let signinSettings: SigninSettings = {
  enabled: 0,
  cycleDays: 7,
  remark: '',
  updatedAt: 0,
  items: [
    { dayNo: 1, bonusAmount: 0, expireDays: 0, rewardDesc: '' },
    { dayNo: 2, bonusAmount: 0, expireDays: 0, rewardDesc: '' },
    { dayNo: 3, bonusAmount: 0, expireDays: 0, rewardDesc: '' },
    { dayNo: 4, bonusAmount: 0, expireDays: 0, rewardDesc: '' },
    { dayNo: 5, bonusAmount: 0, expireDays: 0, rewardDesc: '' },
    { dayNo: 6, bonusAmount: 0, expireDays: 0, rewardDesc: '' },
    { dayNo: 7, bonusAmount: 0, expireDays: 0, rewardDesc: '' },
  ],
};

export const getSigninSettings = async () => cloneSettings(signinSettings);

export const saveSigninSettings = async (values: SigninSettings) => {
  signinSettings = cloneSettings(values);
  return { success: true };
};
