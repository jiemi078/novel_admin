import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message } from 'antd';
import { isAuthEnabled } from './constants/auth';
import { clearToken, getAccessToken } from './services/ant-design-pro/api';

interface BackendResponse<T = unknown> {
  code?: number;
  msg?: string;
  data?: T;
}

interface RequestErrorLike {
  response?: {
    status?: number;
  };
  request?: unknown;
  message?: string;
}

const SUCCESS_CODES = new Set([0]);

export const errorConfig: RequestConfig = {
  errorConfig: {
    errorHandler: (error: RequestErrorLike, opts?: { skipErrorHandler?: boolean }) => {
      if (opts?.skipErrorHandler) throw error;
      if (error?.response?.status === 401) {
        if (isAuthEnabled()) {
          clearToken();
          history.push('/user/login');
        }
        return;
      }
      if (error?.response?.status) {
        message.error(`请求失败：${error.response.status}`);
        return;
      }
      if (error?.request) {
        message.error('服务未响应，请稍后重试');
        return;
      }
      message.error(error?.message || '请求异常');
    },
  },
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = getAccessToken();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
  ],
  responseInterceptors: [
    (response) => {
      const backendResponse = response.data as BackendResponse;
      if (
        typeof backendResponse?.code === 'number' &&
        !SUCCESS_CODES.has(backendResponse.code) &&
        backendResponse.code === 401 &&
        isAuthEnabled()
      ) {
        clearToken();
        history.push('/user/login');
      }
      return response;
    },
  ],
};
