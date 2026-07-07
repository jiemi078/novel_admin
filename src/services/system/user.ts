export type SystemUserItem = {
  id: string;
  username: string;
  nickname: string;
  email: string;
  roles: string[];
  status: 0 | 1;
  lastLoginAt: string;
  createdAt: string;
};

export type SystemUserPageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
};

export type SystemUserCreateValues = Omit<SystemUserItem, 'id' | 'lastLoginAt' | 'createdAt'>;

let userRows: SystemUserItem[] = [
  {
    id: '311520572125220864',
    username: 'admin',
    nickname: '系统管理员',
    email: 'admin@iquickfic.com',
    roles: ['超级管理员'],
    status: 1,
    lastLoginAt: '2026-07-07 16:31:20',
    createdAt: '2026-05-09 23:10:16',
  },
  {
    id: '311520572125220865',
    username: 'operator',
    nickname: '运营账号',
    email: 'operator@iquickfic.com',
    roles: ['运营'],
    status: 1,
    lastLoginAt: '2026-07-06 19:22:08',
    createdAt: '2026-05-12 11:28:35',
  },
  {
    id: '311520572125220866',
    username: 'finance',
    nickname: '财务账号',
    email: 'finance@iquickfic.com',
    roles: ['财务'],
    status: 1,
    lastLoginAt: '2026-07-05 09:42:51',
    createdAt: '2026-05-18 15:03:11',
  },
  {
    id: '311520572125220867',
    username: 'ads_admin',
    nickname: '投放管理员',
    email: 'ads@iquickfic.com',
    roles: ['投放'],
    status: 0,
    lastLoginAt: '2026-06-28 14:12:30',
    createdAt: '2026-05-23 10:44:09',
  },
];

export async function querySystemUserPage(params: SystemUserPageParams) {
  const { current = 1, pageSize = 10, keyword, status } = params;
  const filtered = userRows.filter((row) => {
    const keywordMatched =
      !keyword ||
      [row.username, row.nickname, row.email].some((value) => value.toLowerCase().includes(keyword.toLowerCase()));
    const statusMatched = status === undefined || Number(row.status) === Number(status);
    return keywordMatched && statusMatched;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    success: true,
    total: filtered.length,
  };
}

export async function createSystemUser(values: SystemUserCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  userRows = [
    {
      ...values,
      id: `mock_user_${Date.now()}`,
      roles: values.roles || [],
      status: Number(values.status) as 0 | 1,
      lastLoginAt: '-',
      createdAt: now,
    },
    ...userRows,
  ];

  return { success: true };
}
