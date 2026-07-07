export type OperationFeedbackStatus = 0 | 1 | 2;

export type OperationFeedbackType = 'bug' | 'payment' | 'content' | 'suggestion' | 'other';

export type OperationFeedbackItem = {
  id: string;
  userId: string;
  nickname: string;
  feedbackType: OperationFeedbackType;
  content: string;
  contact: string;
  status: OperationFeedbackStatus;
  createdAt: string;
  handler: string;
  handledAt: string;
  remark?: string;
};

export type OperationFeedbackPageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  feedbackType?: OperationFeedbackType;
  status?: OperationFeedbackStatus;
  createdAt?: string;
};

export type OperationFeedbackCreateValues = Pick<
  OperationFeedbackItem,
  'userId' | 'nickname' | 'feedbackType' | 'content' | 'contact' | 'remark'
>;

let feedbackRows: OperationFeedbackItem[] = [
  {
    id: 'FB202607070001',
    userId: '311520572125220864',
    nickname: 'Emily',
    feedbackType: 'payment',
    content: 'Purchased coin package but coins did not arrive after payment success.',
    contact: 'emily@example.com',
    status: 0,
    createdAt: '2026-07-07 15:42:18',
    handler: '',
    handledAt: '',
    remark: '',
  },
  {
    id: 'FB202607060003',
    userId: '321527044494073856',
    nickname: 'Sophia',
    feedbackType: 'content',
    content: 'Chapter 18 of The Billionaire story is duplicated.',
    contact: 'sophia@example.com',
    status: 1,
    createdAt: '2026-07-06 21:09:35',
    handler: 'operator',
    handledAt: '2026-07-07 10:18:20',
    remark: '已同步内容同学检查章节',
  },
  {
    id: 'FB202607060002',
    userId: '321523306748452864',
    nickname: 'Ava',
    feedbackType: 'bug',
    content: 'The reading page occasionally shows a blank screen after switching network.',
    contact: 'ava@example.com',
    status: 0,
    createdAt: '2026-07-06 18:25:44',
    handler: '',
    handledAt: '',
    remark: '',
  },
  {
    id: 'FB202607050001',
    userId: '316511620727574528',
    nickname: 'Mia',
    feedbackType: 'suggestion',
    content: 'Hope to add more romance categories and author filters.',
    contact: 'mia@example.com',
    status: 2,
    createdAt: '2026-07-05 09:12:06',
    handler: 'operator',
    handledAt: '2026-07-05 16:33:19',
    remark: '需求已记录',
  },
];

export async function queryOperationFeedbackPage(params: OperationFeedbackPageParams) {
  const { current = 1, pageSize = 10, keyword, feedbackType, status, createdAt } = params;
  const filtered = feedbackRows.filter((row) => {
    const keywordMatched =
      !keyword ||
      [row.id, row.userId, row.nickname, row.content, row.contact].some((value) =>
        value.toLowerCase().includes(keyword.toLowerCase()),
      );
    const typeMatched = !feedbackType || row.feedbackType === feedbackType;
    const statusMatched = status === undefined || Number(row.status) === Number(status);
    const dateMatched = !createdAt || row.createdAt.startsWith(createdAt);
    return keywordMatched && typeMatched && statusMatched && dateMatched;
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    success: true,
    total: filtered.length,
  };
}

export async function createOperationFeedback(values: OperationFeedbackCreateValues) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  feedbackRows = [
    {
      ...values,
      id: `FB${Date.now()}`,
      status: 0,
      createdAt: now,
      handler: '',
      handledAt: '',
    },
    ...feedbackRows,
  ];

  return { success: true };
}

export async function updateOperationFeedbackStatus(id: string, status: OperationFeedbackStatus) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  feedbackRows = feedbackRows.map((row) =>
    row.id === id
      ? {
          ...row,
          status,
          handler: status === 0 ? '' : 'operator',
          handledAt: status === 0 ? '' : now,
        }
      : row,
  );

  return { success: true };
}
