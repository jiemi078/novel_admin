import {
  AppstoreOutlined,
  BookOutlined,
  CustomerServiceOutlined,
  FundProjectionScreenOutlined,
  GiftOutlined,
  LineChartOutlined,
  PictureOutlined,
  RocketOutlined,
  SettingOutlined,
  TeamOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import type {
  MenuDataItem,
  Settings as LayoutSettings,
} from '@ant-design/pro-components';
import type { RequestConfig, RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import React from 'react';
import { isAuthEnabled } from './constants/auth';
import { errorConfig } from './requestErrorConfig';
import {
  clearToken,
  currentUser as queryCurrentUser,
  getAccessToken,
} from './services/ant-design-pro/api';

const MENU_ICONS: Record<string, React.ReactNode> = {
  appstore: <AppstoreOutlined />,
  book: <BookOutlined />,
  'customer-service': <CustomerServiceOutlined />,
  fund: <FundProjectionScreenOutlined />,
  gift: <GiftOutlined />,
  'line-chart': <LineChartOutlined />,
  picture: <PictureOutlined />,
  rocket: <RocketOutlined />,
  setting: <SettingOutlined />,
  team: <TeamOutlined />,
  transaction: <TransactionOutlined />,
};

const resolveMenuIcons = (items: MenuDataItem[]): MenuDataItem[] =>
  items.map((item) => ({
    ...item,
    icon: typeof item.icon === 'string' ? MENU_ICONS[item.icon] : item.icon,
    children: item.children ? resolveMenuIcons(item.children) : undefined,
  }));

const loginPath = '/user/login';

const GUEST_USER = {
  id: 0,
  name: '访客',
  nickname: '访客',
  roles: [],
  permissions: ['*:*:*'],
} as API.CurrentUser;

type InitialStateShape = {
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  permissions?: Set<string>;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
};

export async function getInitialState(): Promise<InitialStateShape> {
  const fetchUserInfo = async () => {
    const token = getAccessToken();
    if (!token) return undefined;
    try {
      const res = await queryCurrentUser({ skipErrorHandler: true });
      const user = res?.data?.user;
      if (!user) return undefined;
      return {
        ...user,
        permissions: res?.data?.permissions || user.permissions || [],
      } as API.CurrentUser;
    } catch (_error) {
      clearToken();
      return undefined;
    }
  };

  if (!isAuthEnabled()) {
    return {
      fetchUserInfo,
      currentUser: GUEST_USER,
      permissions: new Set(GUEST_USER.permissions || []),
    };
  }

  if (![loginPath].includes(history.location.pathname)) {
    const currentUser = await fetchUserInfo();
    if (!currentUser) {
      history.push(loginPath);
      return { fetchUserInfo };
    }
    return {
      fetchUserInfo,
      currentUser,
      permissions: new Set(currentUser.permissions || []),
    };
  }

  return { fetchUserInfo };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    menuDataRender: resolveMenuIcons,
    menuItemRender: (item, dom) => {
      if (item.path) {
        return <Link to={item.path}>{dom}</Link>;
      }
      return dom;
    },
    avatarProps: {
      title: initialState?.currentUser?.name || '访客',
    },
    onPageChange: () => {
      if (!isAuthEnabled()) return;
      const { location } = history;
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    bgLayoutImgList: [],
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  baseURL: (() => {
    const runtimeBase = window.config?.api_url;
    const envBase = runtimeBase || process.env.UMI_APP_ADMIN_API_BASE;
    let resolvedBase = '/admin-api';
    if (envBase) {
      const trimmed = envBase.replace(/\/+$/, '');
      resolvedBase = trimmed.endsWith('/admin-api')
        ? trimmed
        : `${trimmed}/admin-api`;
    }
    return resolvedBase;
  })(),
  ...errorConfig,
};
