export type SystemRoleItem = {
  id: string;
  name: string;
  code: string;
  permissionCount: number;
  userCount: number;
  status: 0 | 1;
  remark: string;
  createdAt: string;
};

export type SystemRolePageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
};

export type SystemRoleCreateValues = Omit<SystemRoleItem, 'id' | 'permissionCount' | 'userCount' | 'createdAt'> & {
  permissionCount?: number;
};

let roleRows: SystemRoleItem[] = [
  {
    id: '311520700421685248',
    name: '超级管理员',
    code: 'SUPER_ADMIN',
    permissionCount: 128,
    userCount: 1,
    status: 1,
    remark: '拥有所有系统权限',
    createdAt: '2026-05-09 23:12:04',
  },
  {
    id: '311520700421685249',
    name: '运营',
    code: 'OPERATOR',
    permissionCount: 74,
    userCount: 3,
    status: 1,
    remark: '内容、配置、报表权限',
    createdAt: '2026-05-10 10:18:44',
  },
  {
    id: '311520700421685250',
    name: '财务',
    code: 'FINANCE',
    permissionCount: 31,
    userCount: 1,
    status: 1,
    remark: '订单、分账、财务报表权限',
    createdAt: '2026-05-10 10:22:31',
  },
  {
    id: '311520700421685251',
    name: '投放',
    code: 'ADS_MANAGER',
    permissionCount: 42,
    userCount: 2,
    status: 1,
    remark: '广告投放与素材权限',
    createdAt: '2026-05-11 15:32:07',
  },
];

export async function querySystemRolePage(params: SystemRolePageParams) {
  const { current = 1, pageSize = 10, keyword, status } = params;
  const filtered = roleRows.filter((row) => {
    const keywordMatched =
      !keyword || [row.name, row.code, row.remark].some((value) => value.toLowerCase().includes(keyword.toLowerCase()));
    const statusMatched = status === undefined || Number(row.status) === Number(status);
    return keywordMatched && statusMatched;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    success: true,
    total: filtered.length,
  };
}

export async function createSystemRole(values: SystemRoleCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  roleRows = [
    {
      ...values,
      id: `mock_role_${Date.now()}`,
      permissionCount: Number(values.permissionCount || 0),
      userCount: 0,
      status: Number(values.status) as 0 | 1,
      createdAt: now,
    },
    ...roleRows,
  ];

  return { success: true };
}
