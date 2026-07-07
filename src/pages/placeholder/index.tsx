import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useLocation } from '@umijs/max';
import { Space, Tag } from 'antd';
import React, { useMemo } from 'react';

type MockRow = {
  id: string;
  name: string;
  type: string;
  status: 'enabled' | 'disabled' | 'running';
  sort: number;
  createdAt: string;
  updatedAt: string;
  platform?: string;
  impressions?: number;
  clicks?: number;
  cost?: number;
  roi?: number;
  owner?: string;
};

type MockPageParams = {
  current?: number;
  pageSize?: number;
  keyword?: string;
  status?: MockRow['status'];
};

const routeTitleMap: Record<string, string> = {
  '/material/media': '素材库',
  '/ad-material/push': '素材推送列表',
  '/content/novel': '小说管理',
  '/content/novel/price-template': '小说价格模板',
  '/content/novel/genre': '小说题材管理',
  '/content/novel/tag': '小说标签管理',
  '/data-report/novel-new-user-roi': '用户roi',
  '/data-report/novel-performance': '投放效果',
  '/data-report/novel-total-roi': '总 ROI',
  '/data-report/novel-recovery': '投放回收报表',
  '/data-report/novel-subscription': '订阅报表',
  '/app-config/novel-homepage': '小说系统首页布局',
  '/content/partner': '合作方管理',
  '/content/revenue-share': '分账管理',
  '/monetization/novel/sku-template': '小说SKU模板',
  '/monetization/novel/subscription': '小说订阅管理',
  '/monetization/novel/benefit': '小说权益管理',
  '/ads/pixel': 'Pixel管理',
  '/ads/ad-account': '广告账户',
  '/ads/ad-link': '投放配置',
  '/ads/ad-domain': '域名管理',
  '/ads/campaign': '广告投放',
  '/ads/platform-config': '平台配置',
  '/ads/attribution-config': '归因配置列表',
  '/novel/reward-center/signin': '签到配置',
  '/novel/reward-center/tasks': '日常任务',
  '/operation/feedback': '用户反馈',
  '/system/user': '用户管理',
  '/system/role': '角色管理',
  '/system/language': '语言管理',
  '/system/country': '国家管理',
};

const getPageTitle = (pathname: string) => routeTitleMap[pathname] || 'Mock 页面';

const getCategory = (pathname: string) => {
  if (pathname.startsWith('/data-report')) return 'report';
  if (pathname.startsWith('/ads') || pathname.startsWith('/ad-material')) return 'ads';
  if (pathname.startsWith('/system')) return 'system';
  if (pathname.startsWith('/content')) return 'content';
  if (pathname.startsWith('/monetization')) return 'monetization';
  if (pathname.startsWith('/novel/reward-center')) return 'reward';
  return 'default';
};

const buildMockRows = (pathname: string): MockRow[] => {
  const title = getPageTitle(pathname);
  const category = getCategory(pathname);
  return Array.from({ length: 8 }).map((_, index) => {
    const id = `${category}_${String(index + 1).padStart(4, '0')}`;
    return {
      id,
      name: `${title} Mock ${index + 1}`,
      type:
        category === 'report'
          ? '报表'
          : category === 'ads'
            ? '投放'
            : category === 'system'
              ? '系统'
              : category === 'content'
                ? '内容'
                : '配置',
      status: index % 5 === 0 ? 'disabled' : index % 3 === 0 ? 'running' : 'enabled',
      sort: index + 1,
      createdAt: `2026-07-${String(index + 1).padStart(2, '0')} 10:00:00`,
      updatedAt: `2026-07-${String(index + 1).padStart(2, '0')} 18:30:00`,
      platform: index % 2 === 0 ? 'Facebook' : 'Google',
      impressions: 12000 + index * 2310,
      clicks: 420 + index * 53,
      cost: 88.5 + index * 17.2,
      roi: 1.2 + index * 0.13,
      owner: index % 2 === 0 ? '运营A' : '运营B',
    };
  });
};

const getColumns = (pathname: string): ProColumns<MockRow>[] => {
  const category = getCategory(pathname);
  const baseColumns: ProColumns<MockRow>[] = [
    { title: 'ID', dataIndex: 'id', width: 150, fixed: 'left', search: false },
    { title: '关键词', dataIndex: 'keyword', hideInTable: true, fieldProps: { placeholder: '请输入关键词' } },
    { title: '名称', dataIndex: 'name', width: 220, search: false },
    { title: '类型', dataIndex: 'type', width: 110, search: false },
    {
      title: '状态',
      dataIndex: 'status',
      width: 110,
      valueType: 'select',
      valueEnum: {
        enabled: { text: '启用', status: 'Success' },
        running: { text: '运行中', status: 'Processing' },
        disabled: { text: '停用', status: 'Default' },
      },
      render: (_, record) => {
        if (record.status === 'enabled') return <Tag color="success">启用</Tag>;
        if (record.status === 'running') return <Tag color="processing">运行中</Tag>;
        return <Tag>停用</Tag>;
      },
    },
  ];

  const reportColumns: ProColumns<MockRow>[] = [
    { title: '曝光', dataIndex: 'impressions', width: 110, search: false },
    { title: '点击', dataIndex: 'clicks', width: 110, search: false },
    { title: '消耗', dataIndex: 'cost', width: 110, search: false, render: (_, record) => `$${record.cost?.toFixed(2)}` },
    { title: 'ROI', dataIndex: 'roi', width: 100, search: false, render: (_, record) => record.roi?.toFixed(2) },
  ];

  const adsColumns: ProColumns<MockRow>[] = [
    { title: '平台', dataIndex: 'platform', width: 120, search: false },
    { title: '负责人', dataIndex: 'owner', width: 120, search: false },
  ];

  const tailColumns: ProColumns<MockRow>[] = [
    { title: '排序', dataIndex: 'sort', width: 90, search: false },
    { title: '创建时间', dataIndex: 'createdAt', width: 170, valueType: 'dateTime', search: false },
    { title: '更新时间', dataIndex: 'updatedAt', width: 170, valueType: 'dateTime', search: false },
    {
      title: '操作',
      valueType: 'option',
      width: 150,
      fixed: 'right',
      render: () => (
        <Space size={8}>
          <a>编辑</a>
          <a>详情</a>
        </Space>
      ),
    },
  ];

  if (category === 'report') return [...baseColumns, ...reportColumns, ...tailColumns];
  if (category === 'ads') return [...baseColumns, ...adsColumns, ...tailColumns];
  return [...baseColumns, ...tailColumns];
};

const queryMockPage = async (pathname: string, params: MockPageParams) => {
  const current = Number(params.current || 1);
  const pageSize = Number(params.pageSize || 20);
  const keyword = String(params.keyword || '').trim().toLowerCase();
  const filtered = buildMockRows(pathname).filter((item) => {
    if (params.status && item.status !== params.status) return false;
    if (!keyword) return true;
    return item.name.toLowerCase().includes(keyword) || item.id.toLowerCase().includes(keyword);
  });

  return {
    data: filtered.slice((current - 1) * pageSize, current * pageSize),
    total: filtered.length,
    success: true,
  };
};

const PlaceholderPage: React.FC = () => {
  const location = useLocation();
  const title = getPageTitle(location.pathname);
  const columns = useMemo(() => getColumns(location.pathname), [location.pathname]);

  return (
    <PageContainer title={false}>
      <ProTable<MockRow, MockPageParams>
        headerTitle={title}
        rowKey="id"
        columns={columns}
        tableLayout="fixed"
        scroll={{ x: getCategory(location.pathname) === 'report' ? 1400 : 1200 }}
        search={{ labelWidth: 90, collapseRender: false, defaultCollapsed: false }}
        pagination={{ defaultCurrent: 1, defaultPageSize: 20, showSizeChanger: true }}
        request={async (params) => queryMockPage(location.pathname, params)}
        toolBarRender={false}
      />
    </PageContainer>
  );
};

export default PlaceholderPage;
