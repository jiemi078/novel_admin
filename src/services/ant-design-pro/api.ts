import { request } from '@umijs/max';

const TOKEN_KEY = 'NOVEL_ADMIN_ACCESS_TOKEN';

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY) || '';

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export async function currentUser(options?: { skipErrorHandler?: boolean }) {
  return request<API.ApiResponse<{ user?: API.CurrentUser; permissions?: string[] }>>(
    '/system/auth/profile',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
