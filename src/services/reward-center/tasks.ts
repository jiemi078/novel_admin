export type RewardTaskItem = {
  id: string;
  taskIcon: string;
  taskIconPreviewUrl?: string;
  taskTitle: string;
  taskCode: string;
  taskType: 'daily' | 'one_time';
  bonusAmount: number;
  dailyLimit: number;
  jumpUrl: string;
  status: 0 | 1;
  sortOrder: number;
  remark: string;
  updatedAt: string;
};

export type RewardTaskPageParams = {
  current?: number;
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: number;
};

export type RewardTaskCreateValues = Omit<RewardTaskItem, 'id' | 'updatedAt'>;

let taskRows: RewardTaskItem[] = [];

const includes = (source: string | number | undefined, keyword: string) =>
  String(source || '').toLowerCase().includes(keyword);

export const queryRewardTaskPage = async (params: RewardTaskPageParams) => {
  const current = Number(params.current || params.page || 1);
  const pageSize = Number(params.pageSize || 20);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const status = Number(params.status ?? -1);

  const filtered = taskRows.filter((item) => {
    if (status !== -1 && item.status !== status) return false;
    if (!keyword) return true;
    return (
      includes(item.taskTitle, keyword) ||
      includes(item.taskCode, keyword) ||
      includes(item.remark, keyword)
    );
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
};

export const createRewardTask = async (values: RewardTaskCreateValues) => {
  taskRows = [
    {
      ...values,
      id: `reward_task_${Date.now()}`,
      taskIconPreviewUrl: values.taskIcon,
      updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    },
    ...taskRows,
  ];
  return { success: true };
};

export const deleteRewardTask = async (id: string) => {
  taskRows = taskRows.filter((item) => item.id !== id);
  return { success: true };
};
